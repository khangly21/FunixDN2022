const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
//trong view admin/edit-product.ejs, nếu editing=false thì action="/admin/add-product" method="POST"
router.post('/add-product', adminController.postAddProduct);

// /admin/edit-product/:productId  => GET yêu cầu trang
//dù biến cố URL khác nhau, nhưng cả  adminController.getEditProduct và adminController.getAddProduct đều render view 'admin/edit-product"
router.get('/edit-product/:productId', adminController.getEditProduct);

//  /admin/edit-product => POST sau khi nhấn Update Product
// Không có not receive any dynamic segment because it's a post request so data can be enclosed in the POST request body/payload we're sending,
router.post('/edit-product')


module.exports = router;
