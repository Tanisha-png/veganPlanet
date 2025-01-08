const express = require('express');
const router = express.Router();
const Food = require('../models/food.js');


// Middleware to protect selected routes
const ensureSignedIn = require('../middleware/ensure-signed-in');

// All routes start with '/foods'

// GET /foods/index (index functionality)
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find({}).populate('comments');
    res.locals.foods = foods;
    res.render('foods/index.ejs', {foods: foods});
  } catch (error) {
    console.log(error);
    res.redirect('/');
  };
});

// GET /foods/search (search functionality) 
router.get('/search', async (req, res) => {
  try {
    console.log(req.query.food);
    const foods = await Food.find({alternativeFor: new RegExp(`.*${req.query.food}.*`, 'i')});
    console.log(foods);
    res.render('foods/search.ejs', {title: 'Search Vegan Alternatives', foods});
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// GET /foods/new (new functionality) 
router.get('/new', ensureSignedIn, (req, res) => {
  res.render('foods/new.ejs', {title: 'Add Foods'});
});

// GET /foods/:foodId (show functionality)
router.get('/:foodId', async (req, res) => {
  const food = await Food.findById(req.params.foodId).populate('comments');
  res.render('foods/show.ejs', {title: 'Details For:', food});
});

// POST /foods (create functionality)
router.post('/', async (req, res) => {
  try {
    req.body.owner = req.user._id;
    await Food.create(req.body);
    res.redirect('/foods');
  } catch (error) {
    console.log(error);
    res.redirect('/foods/new');
  }
});

// POST /foods/:id/comments 
router.post('/:id/comments', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    req.body.user = req.user._id;
    food.comments.push(req.body);
    await food.save();
    res.redirect(`/foods/${req.params.id}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// GET /foods/:foodId/comments/:commentId (edit functionality/action)
router.get('/:foodId/comments/:commentId/edit', async (req, res) => {
  console.log(req.params);
  try {
    const food = await Food.findById(req.params.foodId);
    console.log(food);
    const comment = food.comments.id(req.params.commentId);
    res.render('foods/edit.ejs', {title: 'Vegan 🌎 Planet', food, comment});
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// PUT /foods/:id (update functionality/action)
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    // const foodItem = user.foods.id(req.params.id);
    const comment = food.comments.id(req.params.commentId);
    comment.set(req.body);
    // await user.save();
    await food.save();
    res.redirect('/foods')
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// DELETE /foods/:foodId/comments/:commentId (delete functionality/action)
router.delete('/:foodId/comments/:commentId', async (req, res) => {
  console.log(req.params)
  try {
    const food = await Food.findById(req.params.foodId);
    console.log(food);
    food.comments.id(req.params.commentId).deleteOne();
    await food.save();
    res.redirect(`/foods/${req.params.foodId}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


module.exports = router;