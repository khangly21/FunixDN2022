const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

//      /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct); //Idea: lấy form cho 1 SP rồi nhấn nút Add Product

//      /admin/products => GET
router.get('/products', adminController.getProducts); //Idea: 1 card có thể edit và delete

//     /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct); //Idea: được gọi khi admin đồng ý Add Product

module.exports = router;
