const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

// /admin/delete => POST 
router.post('/admin/delete-product',adminController.postDeleteProduct)
//since it's a post request, we also don't need to enclose or encode any information in our path in the url, we can put it as part of our request body instead
   /// đó là lý do thường input hidden productId gửi kèm POST req body 

module.exports = router;
