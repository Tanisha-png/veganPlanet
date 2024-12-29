const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

const foods = ['vegan cheese', 'tofu'];

// Middleware to protect selected routes
const ensureSignedIn = require('../middleware/ensure-signed-in');

// All routes start with '/foods'

// GET /foods (index functionality) 
router.get('/', (req, res) => {
  res.send('Foods listed here.');
});

// GET /foods/new (new functionality) 
router.get('/new', ensureSignedIn, (req, res) => {
  res.render('foods/new.ejs', {title: 'Add Foods'});
});

// GET /foods/:foodId (show functionality)
router.get('', () => {
  
});

// POST /foods (create functionality)

module.exports = router;