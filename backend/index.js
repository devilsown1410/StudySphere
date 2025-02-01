const express=require('express')
const app=express()
const port=process.env.PORT || 3000
const dotenv=require('dotenv')
const connectDB=require('./Config/db')
dotenv.config()
connectDB();
app.get('/',(req,res)=>{
    res.send('Backend is Live')
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})