const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

//Đây là nơi nhận các biến cố Customer Action, hay Customer will manage their cart

//các hàm sau nhận tham số thứ 2 là  function object, là callback function hay middleware function

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

//connect our cart delete item route to the newly created shop controller
// /cart-delete-item => GET
router.get('/cart-delete-item/cartitem',shopController.getCartDeleteProduct);

router.post('/create-order',shopController.postOrder);

router.get('/orders', shopController.getOrders);

//router.get('/checkout', shopController.getCheckout); //Trong controller shop.js đã xóa hàm getCheckout, do đó khi control đọc tới đây phát hiện undefined onject getCheckout sẽ báo lỗi (vì JS function cũng là 1 object): Router.get() requires a callback function but got an undefined object
//I deleted the action getCheckout, so I delete the route too

module.exports = router;
