// controllers/comments.js

const express = require('express');
const router = express.Router();
const Food = require('../models/food');

router.get('/:foodId', async (req, res) => {
    try {
        const food = await Food.findById(req.params.foodId);
        // res.locals.comments = comments;
        console.log(food.comments);
        res.render('comments/index.ejs', {comments});
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/new', (req, res) => {
    res.render('comments/new.ejs', {title: 'Add Review'});
});

router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.foodId);
        res.render('comments/show.ejs', {comment});
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// router.get('/:id/edit', async (req, res) => {
//     try {
//         const comment = await Comment.findById(req.params.id);
//         res.render('comments/edit.ejs', {comment});
//     } catch (error) {
//         console.log(error);
//         res.redirect('/');
//     }
// });

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const newComment = new Comment(req.body);
        newComment.user = req.session.user._id;
        await newComment.save();
        res.redirect('/comments');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.redirect('/comments');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {text, rating} = req.body;
        const comment = await Comment.findByIdAndUpdate(req.params.id, {text, rating});
        res.redirect(`/comments/${req.params.id}`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;