const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

//2 routes sau giống ở chỗ Controller đều yêu cầu Service thực hiện find()
router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);

// router.get('/products/:productId', shopController.getProduct);

// router.get('/cart', shopController.getCart);

// router.post('/cart', shopController.postCart);

// router.post('/cart-delete-item', shopController.postCartDeleteProduct);

// router.post('/create-order', shopController.postOrder);

// router.get('/orders', shopController.getOrders);  //page not found because orders, the orders page the route wasn't added again

module.exports = router;
