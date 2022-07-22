const express = require('express');

const staffController = require('../controllers/staffController');

const router = express.Router();

router.get('/', staffController.staffHomepage);

router.get('/diemdanh',staffController.staffDiemdanh);

router.get('/submitted_and_received_diemdanh', staffController.getAddDiemDanh);

router.post('/submitted_and_received_diemdanh', staffController.postAddDiemDanh);

router.get('/ketthuclam',staffController.getKetthuclam);

router.post('/checkout',staffController.postCheckout);

router.get('/nghiphep',staffController.getNghiphep);

router.post('/nghiphep',staffController.postNghiphep);

router.post('/ngaynghiphepnam',staffController.postUpdateNgayNghiPhepNamDangKy);

router.get('/xem_thong_tin',staffController.getStaffInformation);

router.get('/edit-profile',staffController.getEditStaffInformation);

router.post('/post-profile',staffController.postEditStaffInformation);

router.get('/xem-form-Covid19',staffController.getFormCovid19);

router.post('/post-form-Covid19',staffController.postFormCovid19);

router.get('/tra_cuu_thong_tin_gio_lam_va_luongthang',staffController.getHourandMonthlySalary )

module.exports =router;