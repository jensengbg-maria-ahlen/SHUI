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
            const bytes = CryptoJS.AES.decrypt(user.userkey, process.env.SECRET);
            const USER_KEY_DECRYPTED = bytes.toString(CryptoJS.enc.Utf8);

            const token = jwt.sign({ uuid: user.uuid }, process.env.JWT_KEY, {
                expiresIn: 600
            });
            
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

module.exports = router;