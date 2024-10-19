//const { JsonWebTokenError } = require('jsonwebtoken');
const vendor = require('../models/vendor');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config()

const secreteKey = process.env.secrete;


exports.verify = async(req,res,next)=>{
    const token = req.headers.token;

    if(!token)
    {
        return res.status(404).json({error: "Token is Required"});
    }
    try {
        const decoded = jwt.verify(token,secreteKey);
        const vendor_id = await vendor.findById(decoded.venId)
        if(!vendor_id)
        {
            return res.status(404).json({error:"vendor not Found"})
        }

        req.vendorId = vendor_id._id;


        next()
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:"Invalid Token"})

    }
}