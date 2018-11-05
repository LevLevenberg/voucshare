const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.ctrl');

router
.route('/categories')
.get(categoryController.get);

router
.route('/categories/add')
.post(categoryController.post);

module.exports = router;
