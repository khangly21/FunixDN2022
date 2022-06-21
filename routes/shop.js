const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

//Đây là nơi nhận các biến cố Customer Action, hay Customer will manage their cart

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

//connect our cart delete item route to the newly created shop controller
// /cart-delete-item => GET
router.get('/cart-delete-item/cartitem',shopController.getCartDeleteProduct);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
