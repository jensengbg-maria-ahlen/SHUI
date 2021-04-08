const { Router } = require('express');
const { db } = require('./db');
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const router = new Router();

router.post('/login', async (req, res) => {
    let user = db.get('users').find({ username: req.body.username }).value();

    if(user) {
        const validPass = await bcrypt.compare(req.body.password, user.password);

        if(validPass) {
            const bytes = CryptoJS.AES.decrypt(user.userkey, process.env.SECRET_KEY);
            const USER_KEY_DECRYPTED = bytes.toString(CryptoJS.enc.Utf8);

            const token = jwt.sign({ uuid: user.uuid }, process.env.JWT_KEY);
            
            res.status(200).send({
                token: token,
                userkey: USER_KEY_DECRYPTED
            });
        } else{
            res.status(403).send('No data available');
        }
    } else {
        res.status(404).send('Not found')
    }
});

//check if user is loggedin
router.get('/isloggedin', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];

    let resObj = {
        loggedIn: false
    }
    
    try {
        if(token) {
            const verified_user = jwt.verify(token, process.env.JWT_KEY);
            if(verified_user) {
                resObj.loggedIn = true;
                resObj.user = verified_user
            }
            res.status(200).send(resObj); 
        } else {
            res.status(403).send(resObj);
        }
    } catch (error) {
        res.status(403).send(resObj);
    }
})

module.exports = router;