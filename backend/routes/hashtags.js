const { Router } = require('express');
const { db } = require('./db');
const jwt = require('jsonwebtoken');
const router = new Router();

router.post('/addTag', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];

    try {
        const verified_user = jwt.verify(token, process.env.JWT_KEY);
        let user = await db.get('users').find({ uuid: verified_user.uuid }).get('tags').push(req.body.tags).write()
        
        res.status(200).send(user.tags)
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
})


router.post('/removeTag', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];

    try {
        const verified_user = jwt.verify(token, process.env.JWT_KEY);
        let user = await db.get('users').find({ uuid: verified_user.uuid }).get('tags').pullAll(req.body.tags).write()

        res.status(200).send(user)
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
})

module.exports = router;