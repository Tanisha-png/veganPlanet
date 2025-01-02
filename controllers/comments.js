// controllers/comments.js

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment.js');

router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find({}).populate('comments');
        res.locals.comments = comments;
        console.log(comments);
        res.render('recipes/index.ejs');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/new', (req, res) => {
    res.render('comments/new.ejs', {title: 'Add Review'});
});

router.get('/:id', async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    res.render('comments/show.ejs', {comment});
});

router.get('/:id/edit', async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    res.render('comments/edit.ejs', {comment});
});

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const newComment = new Comment(req.body);
        newComment.user = req.session.user._id;
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.delete('/', async (req, res) => {
    await Comment.findByIdDelete(req.params.id);
    res.redirect('/comments');
});

router.put('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/comments`)
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;