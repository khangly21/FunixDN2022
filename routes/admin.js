const path = require('path');

const express = require('express');

//Theo kiến trúc MVC, thì route sẽ gắn liền với controller
const productsController=require('../controllers/products');//  .. là up 1 level to Root project folder là NJS101X


const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', productsController.getAddProductPage);//cần link tới product controller

// /admin/add-product => POST
router.post('/add-product',productsController.postAddProduct);

module.exports = router;

