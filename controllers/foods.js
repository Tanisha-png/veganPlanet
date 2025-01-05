const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

const foods = ['vegan cheese', 'tofu'];

// Middleware to protect selected routes
const ensureSignedIn = require('../middleware/ensure-signed-in');

// All routes start with '/foods'

// GET /foods (index functionality) 
router.get('/', async (req, res) => {
  res.send('Foods listed here.');
});

router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    res.locals.veganFoods = user.veganName;
    console.log(user.veganName);
    res.render('foods/index.ejs');
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
  const food = await Food.findById(req.params.foodId);
  res.render('foods/show.ejs', {title: 'All Foods'});
});

// POST /foods (create functionality)
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findById(req.session.user);
    user.push(req.body);
    await user.save();
    res.redirect(`/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// GET /foods/:id/edit (edit functionality/action)
router.get('/:id/edit', async (req, res) => {
  console.log('editing', req.params);
  try {
    const user = await User.findById(req.sessionID.user._id);
    const foodItem = user.foods.id(req.params.id)
    res.locals.food = foodItem;
    res.render('foods/edit.ejs');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// PUT /foods/:id (update functionality/action)
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const foodItem = user.foods.id(req.params.id);
    foodItem.set(req.body);
    await user.save();
    res.redirect('/foods')
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// DELETE /foods/:id (delete functionality/action)
router.delete('/:id', async (req, res) => {
  console.log(req.params)
  try {
    const user = await User.findById(req.session.user._id);
    user.foods.id(req.params.id).deleteOne();
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


module.exports = router;