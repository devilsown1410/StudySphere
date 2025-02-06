const Material=require('../Models/Material')
const multer=require('multer')
const cloudinary=require('../Config/cloudinary')
const Material=require('../Models/Material')
const uploadMaterial=async(req,res)=>{
    try{
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "study_materials" });
        const newMaterial = new Material({
          title: req.body.title,
          fileUrl: result.secure_url,
          uploadedBy: req.user.uid,
        });
        await newMaterial.save();
        res.json(newMaterial);
    }catch(error){
        res.status(500).json({message:"Error uploading material"})
    }
}

const fetchMaterial=async(req,res)=>{
    try{
        const materials=await Material.find().populate("uploadedBy","name");
        res.json(materials);
    }catch(error){
        res.status(500).json({message:"Error fetching materials"});
    }
}
module.exports={
    uploadMaterial,fetchMaterial};