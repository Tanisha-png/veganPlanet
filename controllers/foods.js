const express = require('express');
const router = express.Router();

const foods = ['vegan cheese', 'tofu'];

// Middleware to protect selected routes
const ensureSignedIn = require('../middleware/ensure-signed-in');

// All routes start with '/foods'

// GET /foods (index functionality) 
router.get('/', (req, res) => {
  res.send('Hooray - the foods are here!');
});

// GET /foods/new (new functionality) 
router.get('/new', ensureSignedIn, (req, res) => {
  res.send('Add a food!');
});



module.exports = router;