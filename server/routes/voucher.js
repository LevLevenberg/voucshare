const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/voucher.ctrl');
//get a list of all published vouchers
router
.route('/voucher')
.get(voucherController.get);

//add new voucher to db
router
.route('/voucher/add')
.post(voucherController.add);

//update existing voucher
router
.route('/voucher/update/:id')
.put(voucherController.update);

//delete voucher
router
.route('/voucher/delete/:id')
.delete(voucherController.delete);

module.exports = router;
