const express = require('express');

const dogHolderController = require('../controllers/dogHolder');

//module router
const router = express.Router();

//  http://localhost:4000/admin/findAllDog => GET
router.get('/findAllDog', dogHolderController.findAllDog_query_and_render);

module.exports =router;