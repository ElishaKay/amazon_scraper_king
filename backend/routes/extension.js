const express = require('express');
const router = express.Router();

// controllers
const { logIn, saveProducts, savePage, saveProductsFromSearch, savePageFromSearch } = require('../controllers/extension');

// validators
const { runValidation } = require('../validators');
const { userSigninValidator } = require('../validators/extension');

// only difference is methods not name 'get' | 'post' | 'delete'
router.post('/extension/login', userSigninValidator, runValidation, logIn);
router.post('/extension/products', saveProducts, savePage);
router.post('/extension/products-from-search', saveProductsFromSearch, savePageFromSearch);
// router.post('/extension/products', saveProducts, savePage);

module.exports = router; 
