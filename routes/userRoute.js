const express = require('express');
const router = express.Router();
// const fs = require("fs");
const jwt = require("jsonwebtoken");
// const knex = require("knex")(require("../knexfile"));
require("dotenv").config();

function authorize(req, res, next) {
    const {authorization} = req.headers
    const token = authorization.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(403)
            .json({ success: false, message: 'Token Missing'})
        } else {
            req.decoded = decoded;
        }
        next()
    })
}

const users = {};

router.post('/sign', (req, res) => {
    const { username, name, password } = req.body;
    users[username] = {
        name,
        password
    }
    res.json({ success: true });
});

router.post('/sign', async (req, res) => {
    const { username, password } = req.body;
    const user = users[username];
    if (user && user.password === password) {
        const token = jwt.sign({ username }, SECRET_KEY);
        res.json({token})
    }
});

router.get('/sign', authorize, (req, res) => {
    res.json(req.decoded);
})