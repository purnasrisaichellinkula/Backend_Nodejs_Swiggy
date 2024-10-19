const vendor = require('../models/vendor');
const firm = require('../models/firm');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv")

dotenv.config()
const secreteKey = process.env.secrete
exports.vendorRegister = async(req,res)=>{
    const {username,email,password} = req.body;
    try{
        const vendorEmail = await vendor.findOne({email});
        if(vendorEmail)
        {
            return res.status(400).json("Email already Exits.");
        }
        const hashpass = await bcrypt.hash(password,10);

        const newven = new vendor({
            username,
            email,
            password:hashpass
        });
        await newven.save();
        res.status(201).json({message:"Vendor registered Sussessfully!..."});
        console.log('Registered')
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})

    }

}

exports.vendorlogin = async(req,res)=>
{
    const {email,password} = req.body;
    try{
        const vendorlo = await vendor.findOne({email});
        if(!vendorlo || !(await bcrypt.compare(password,vendorlo.password)))
        {
            return res.status(401).json({error: "Invalid username or Password"});
        }

        const token = jwt.sign({venId:vendorlo._id},secreteKey)

        res.status(200).json({Sucess : "Login Successsful!" , Token : token});
        console.log(email,token);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error : "Internal Server error"});



    }
}

exports.getAllVendors = async(req,res)=>
{
    try
    {
        const vendors = await vendor.find().populate('firm');
        res.json({vendors})

    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error : "Internal Server error"});
    }
}

exports.getVendorById = async(req,res)=>
{
    const vendorId = req.params.apple;

    try{
        const vendor_data = await vendor.findById(vendorId).populate('firm');
        if(!vendor_data)
        {
            return res.status(404).json({error:"Vendor Not Found"});
        }
        res.status(200).json({vendor_data})

    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error : "Internal Server error"});
    }
}

// module.exports = {vendorRegister}


// module.exports = {vendorlogin}