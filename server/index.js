require('dotenv').config(); 
const express  = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

// Routes
app.use('/',(req,res)=>{
    return res.json({message:'hellow world'})
})


// Server Started 
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})