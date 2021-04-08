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

        let usersTags = db.get('users').find({ uuid: verified_user.uuid }).get('tags').push(...req.body.tags).write()
        console.log(usersTags)

        const newFlow = {
            id: shortid.generate(),
            date: new Date().toLocaleString(),
            owner: CryptoJS.SHA3(user.uuid).toString(),
            username: user.username,
            info: CryptoJS.AES.encrypt(req.body.info, process.env.SECRET).toString(),
            tags: req.body.tags
        }

        db.get('flows').push(newFlow).write()
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
        let user = db.get('users').find({ uuid: verified_user.uuid }).value()

        const bytes = CryptoJS.AES.decrypt(user.userkey, process.env.SECRET);
        const USER_KEY_DECRYPTED = bytes.toString(CryptoJS.enc.Utf8);
        
        const filterflowTags = (flow) => {
            const filteredTags = flow.tags.filter((tag) =>
                user.tags.includes(tag) 
            )
            return filteredTags.length > 0;
        }

        if (user.tags.length > 0) {
            let flows = db.get('flows').filter(filterflowTags).value()

            let newFlowsArray = flows.map(flow => {
                try {
                    let decrypt = CryptoJS.AES.decrypt(flow.info, process.env.SECRET).toString(CryptoJS.enc.Utf8)
                    let encrypted = CryptoJS.AES.encrypt(decrypt, USER_KEY_DECRYPTED).toString()
                    flow.info = encrypted
                    return {...flow, info: encrypted}
                } catch (error) {
                    console.log(error)
                }
            })
            res.status(200).send(newFlowsArray)
        } else {
            let flows = db.get('flows').value()
            let newFlowsArray = flows.map(flow => {
                try {
                    let decrypt = CryptoJS.AES.decrypt(flow.info, process.env.SECRET).toString(CryptoJS.enc.Utf8)
                    console.log(decrypt)
                    let encrypted = CryptoJS.AES.encrypt(decrypt, USER_KEY_DECRYPTED).toString()
                    flow.info = encrypted
                    return {...flow, info: encrypted}
                } catch (error) {
                    console.log(error)
                }
            })
            res.status(200).send(newFlowsArray)
        }

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = router;