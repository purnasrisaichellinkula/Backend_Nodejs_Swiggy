const express = require("express");
const vendorcon = require('../controllers/vendorController');
const {verify} = require('../middlewares/verifytoken');
const firmController = require("../controllers/firmController");
const productController = require("../controllers/productController");


const router = express.Router();

router.post('/addfirm',verify,firmController.addfirm);

router.get('/uploads/:imageName',(req,res)=>
{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
});

router.delete('/:firm_Id',firmController.deleteFirmById);
module.exports= router;