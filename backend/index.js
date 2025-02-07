const express=require('express')
const app=express()
const port=process.env.PORT || 3000
const dotenv=require('dotenv')
const connectDB=require('./Config/db')
const userRoutes=require('./Routes/user')
const materialRoutes=require('./Routes/Material')
const cors=require('cors')
dotenv.config()
connectDB();
app.use(cors())
app.use(express.json())
app.use('/users',userRoutes);
app.use('/material',materialRoutes)
app.get('/',(req,res)=>{
    res.send('Backend is Live')
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})