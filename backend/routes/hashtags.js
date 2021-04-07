const { Router } = require('express');
const { db } = require('./db');
const jwt = require('jsonwebtoken');
const router = new Router();

router.get('/followedTags', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];

    try {
        const verified_user = jwt.verify(token, process.env.JWT_KEY);
        let user = db.get('users').find({ uuid: verified_user.uuid }).value();

        res.status(200).send(user.tags)
    } catch (error) {
        res.status(400).send('no tags')
    }
})

router.get('/chosenTags', (req, res) => {
    const token = req.headers["authorization"].split(" ")[1];
    try {
        const verified_user = jwt.verify(token, process.env.JWT_KEY);
        let flows = db.get('flow').value()

        let newFlowsArray = flows.map(tag => {
            return tag.tags
        })
        
        res.status(200).send(newFlowsArray)
    } catch (error) {
        console.log(error)
        res.status(400).send('no tags')
    }
})

module.exports = router;