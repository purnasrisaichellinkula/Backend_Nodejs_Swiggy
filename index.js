const express = require("express")
const dotenv= require("dotenv")
const mongoose = require("mongoose")
const vendorRoutes= require("./routes/vendorRoutes")
const bodyparser = require("body-parser")
const firmRoutes = require('./routes/firmroutes')
const productRoutes = require('./routes/productRoutes')
const path = require("path");


const app=express()
dotenv.config();
mongoose.connect(process.env.Mongo_URI)
.then(()=>console.log("Database Connected Successfully!"))
.catch((error)=>console.log(error))

const port= process.env.port || 4000;

app.use(bodyparser.json());
app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes);
app.use('/uploads',express.static('uploads'));

app.listen(port,()=>{
    console.log('Server Running at Port 4000....')
})

app.get('/',(req,res)=>{
    res.send("<h1>Welcome To Swiggy!");
})