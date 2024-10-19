const firm = require('../models/firm');
const path = require("path");
const vendormodel = require('../models/vendor');
const multer = require('multer');


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage:storage});

const addfirm = async(req,res)=>{
   try
    {
    const {firmName,area,category,region,offer} = req.body;

    const image = req.file?req.file.filename:undefined;

    if(!req.vendorId)
    {
        return res.status(400).json({message:"vendorId is required"});
    }

    const vendor = await vendormodel.findById(req.vendorId)
    if(!vendor)
    {
       return  res.status(404).json({message:"vendor not found"})
    }
    const new_firm = new firm({
        firmName,area,category,region,offer,image,vendor:vendor._id
    });
    const savedfirm = await new_firm.save();

    vendor.firm.push(savedfirm);
    await vendor.save();

    return res.status(200).json({message:"Firm added SucessesFully!.."})
}
catch(error)
{
    console.log(error);
    return res.status(401).json("Internal Server Error")
}
}

const deleteFirmById = async(req,res)=>
{
    try{
        const firm_Id = req.params.firm_Id;
        const deletedFirm = await firm.findByIdAndDelete(firm_Id);
        if(!deletedFirm)
            {
                return res.status(404).json({error: " No Folder Found"});

            } 

    }
    catch(error)
    {

    console.log(error);
    return res.status(401).json("Internal Server Error")

    }
}



module.exports ={ addfirm:[upload.single('image'),addfirm],deleteFirmById};