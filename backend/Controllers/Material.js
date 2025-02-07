const Material=require('../Models/Material')
const User=require('../Models/User')
const multer=require('multer')
const cloudinary=require('../Config/cloudinary')
const Notification = require('../Models/Notification')
const uploadMaterial=async(req,res)=>{
    try{
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "study_materials" });
        const newMaterial = new Material({
          title: req.body.title,
          fileUrl: result.secure_url,
          uploadedBy: req.user.uid,
        });
        await newMaterial.save();
        const Students=await User.find({role:"student"});
        const notifications=Students.map((Student)=>({
            userId:Student._id,
            message:`New study material uploaded: ${title}`,
        }))
        await Notification.insertMany(notifications);
        res.status(201).json({newMaterial,message:"Material uploaded and notification sent"});
    }catch(error){
        res.status(500).json({message:"Error uploading material"})
    }
}

const fetchMaterial=async(req,res)=>{
    try{
        const materials=await Material.find().populate("uploadedBy","email");
        res.json(materials);
    }catch(error){
        res.status(500).json({message:"Error fetching materials"});
    }
}
module.exports={
    uploadMaterial,fetchMaterial};