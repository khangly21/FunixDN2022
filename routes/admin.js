const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router(); //Router-level middleware works in the same way as application-level middleware, except it is bound to an instance of express.Router().
//Load router-level middleware by using the router.use() and router.METHOD() functions.
//http://expressjs.com/en/guide/using-middleware.html

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

//<a href="/admin/edit-product/<%= product._id %>?edit=true" class="btn">Edit</a>
router.get('/edit-product/:productId', adminController.getEditProduct);


router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
