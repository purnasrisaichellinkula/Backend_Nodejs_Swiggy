const Product = require("../models/product");
const multer =require("multer");
const Firm = require("../models/firm");
const path = require("path");
const { error } = require("console");


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage:storage});

const addProduct = async(req,res)=>{
    try{
        const {productName,price,category,bestseller,description}=req.body;
        const image = req.file ? req.file.filename:undefined;

        const firmId = req.params.firmId;
        const firm_data = await Firm.findById(firmId);

        if(!firm_data)
        {
            return res.status(404).json({error: "No firm Found"});

        }
        const product = new Product({
            productName,price,category,bestseller,description,image,firm:firm_data._id
        })
        const savedProducts = await product.save();
        firm_data.products.push(savedProducts._id);
        await firm_data.save();

        res.status(200).json(savedProducts);

    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error : "Internal Server error"});

    }
}

const getProductByFirm = async(req,res)=>
{
    try{
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if(!firm)
        {
            return res.status(404).json({error: "No Firm Found"});
        }

        const restaurantName = firm.firmName;
        const products = await Product.find({firm:firmId});
        res.status(200).json({restaurantName,products});

    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error : "Internal Server error"});

    }
}

const deleteProductById = async(req,res)=>
{
    try{
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if(!deletedProduct)
        {
            return res.status(404).json({error: " No Folder Found"});
        }

    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error : "Internal Server error"});

    }
}

module.exports = {addProduct:[upload.single('image'),addProduct], getProductByFirm,deleteProductById};