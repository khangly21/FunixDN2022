const path = require('path');

const express = require('express');

//Theo lý thuyết, route sẽ gắn liền với controller
const shopController = require('../controllers/shop');

//tạo router object
const router = express.Router();

// http://localhost:3000/ hoặc click menu "Shop", sẽ hướng tới view res.render('shop/index'). Câu hỏi là view index.ejs (không có nút Details) ở đây, vậy view product-list.ejs (có nút Details) sẽ dành cho menu "Products"
router.get('/', shopController.getIndex); 

//http://localhost:3000/products  (hướng tới view res.render('shop/product-list') ,tại đây mỗi card cho phép xem Details)
router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct); //tại /products nếu click Details thì sẽ tới /products/:id

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
