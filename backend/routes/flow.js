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
            info: CryptoJS.AES.encrypt(req.body.info, process.env.PUBLIC_KEY).toString(),
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

        
        //filter out all tags that user is following
        const filterflowTags = (flow) => {
            const filteredTags = flow.tags.filter((tag) =>
                user.tags.includes(tag) 
            )
            return filteredTags.length > 0;
        }

        //get all flows that user is following
        if (user.tags.length > 0) {
            let flows = db.get('flows').filter(filterflowTags).value()            
            res.status(200).send(flows)
        } else {            
            let flows = db.get('flows').value()
            res.status(200).send(flows)
        }

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = router;