// // controllers/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.locals.user = users;
        res.render('users/index.ejs', {users});
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById
    } catch (error) {

    }
})