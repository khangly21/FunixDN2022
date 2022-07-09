const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

//CÁCH SẮP XẾP: router.get nhóm chung với nhau vì là nhóm menus

// /admin/add-product => GET
//tham số thứ nhất là 'API endpoint', tham số thứ 2 là 'request handler, đồng nghĩa với controller (manager)' which can access (req, res, next) nên gọi là middleware
router.get('/add-product', adminController.getAddProduct);//hàm middleware là callback, sẽ được kích hoạt khi có req


// /admin/products => GET
router.get('/products', adminController.getProducts); //giả sử chỗ edit sản phẩm, tải form lên với POST tới /admin/products thì Page Not Found


// nhận form post từ Admin edits products /admin/products => POST
router.post('/products', adminController.postEditProduct);

// /admin/edit-product/:productId => GET
//querying endpoint with productId for the form to edit
router.get('/edit-product/:productId', adminController.getEditProduct);

router.get('/san_pham_vua_chinh_sua',function(req,res){
    console.log("Hi");
})

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

// /admin/edit-product => POST
router.post('/edit-product', adminController.postEditProduct); //post req tới /edit-product thì sẽ được Controller nhận và xử lý bằng cách res.redirect('/admin/products');

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
