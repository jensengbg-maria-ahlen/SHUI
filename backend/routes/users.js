const { Router } = require('express');
const { db } = require('./db');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const router = new Router();

router.post('/create', async (req, res) => {
    if(req.body.username && req.body.password) {
        const HASHED_PW = await bcrypt.hash(req.body.password, 10);

        const USER_KEY = shortid.generate();
        const USER_KEY_ENCRYPTED = CryptoJS.AES.encrypt(USER_KEY, process.env.SECRET).toString();

        let newUser = {
            uuid: shortid.generate(),
            username: req.body.username,
            password: HASHED_PW,
            userkey: USER_KEY_ENCRYPTED
        };

        db.get('users').push(newUser).write();
        res.status(201).send('User Created');
    } else {
        res.status(400).end('Whoops! Did you really entered the credentials correctly?');
    }
});

module.exports = router;