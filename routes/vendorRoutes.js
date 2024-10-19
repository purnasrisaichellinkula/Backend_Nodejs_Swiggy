//const vendorcon = require("../controllers/vendorController");
const express = require("express");
const vendorcon = require('../controllers/vendorController');

const router = express.Router();

router.post('/register',vendorcon.vendorRegister);
router.post('/login',vendorcon.vendorlogin);
router.get('/allvendor',vendorcon.getAllVendors);
router.get('/singlevendor/:apple',vendorcon.getVendorById);

module.exports= router;
