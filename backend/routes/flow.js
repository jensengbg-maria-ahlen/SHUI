const { Router } = require('express');
const { db } = require('./db');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const router = new Router();

router.post('/create', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];

    try {
        const verified_user = jwt.verify(token, process.env.JWT_KEY);
        let user = db.get('users').find({ uuid: verified_user.uuid }).value();

        const newFlow = {
            id: shortid.generate(),
            date: new Date(),
            owner: CryptoJS.SHA3(user.uuid).toString(),
            username: user.username,
            info: CryptoJS.AES.encrypt(req.body.info, process.env.SECRET).toString(),
            tags: req.body.tags
        }

        console.log('info: ', req.body.info)

        db.get('flow').push(newFlow).write()
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(403)
        console.log(error)
    }
});


router.get('/', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];

    try {
        const verified_user = jwt.verify(token, process.env.JWT_KEY);
        let user = db.get('users').find({ uuid: verified_user.uuid }).value();

        const bytes = CryptoJS.AES.decrypt(user.userkey, process.env.SECRET);
        const USER_KEY_DECRYPTED = bytes.toString(CryptoJS.enc.Utf8);
        console.log('userkey: ', USER_KEY_DECRYPTED)

        let flows = db.get('flow').value()

        let newFlowsArray = flows.map(flow => {
            try {
                console.log(3, flow, process.env.SECRET)
                let decrypt = CryptoJS.AES.decrypt(flow.info, process.env.SECRET).toString(CryptoJS.enc.Utf8)
                console.log(4, decrypt)

                let encrypted = CryptoJS.AES.encrypt(decrypt, USER_KEY_DECRYPTED).toString()
                console.log(5, encrypted)

                flow.info = encrypted

                return flow
            } catch (error) {
                console.log(error)
            }
        })

        res.status(200).send(newFlowsArray)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
})

module.exports = router;