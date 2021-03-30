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
            owner: CryptoJS.SHA3(user.uuid).toString(),
            username: req.body.username,
            info: req.body.info,
            tags: req.body.tags
        }

        db.get('flow').push(newFlow).write()
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(400)
    }
});


router.get('/', (req, res) => {
    try {
        let flow = db.get('flow').value()
        res.status(200).send(flow)

    } catch (error) {
        res.sendStatus(400)
    }
})

module.exports = router;