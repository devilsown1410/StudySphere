const Material = require('../Models/Material');
const User = require('../Models/User');
const cloudinary = require('../Config/cloudinary');
const Notification = require('../Models/Notification');
const streamifier=require('streamifier');

const uploadMaterial = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }else{
        const streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "study_materials" },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
        const result = await streamUpload(req);
        const user=await User.findOne({email:req.user.email});
        // console.log(req.file.originalname,result.secure_url,user._id)
        const newMaterial = new Material({
            title: req.file.originalname,
            fileUrl: result.secure_url,
            uploadedBy: user._id,
        });
        await newMaterial.save();

        await User.findByIdAndUpdate(
            user._id,
            { $push: { uploadedMaterials: newMaterial._id } },
            { new: true, useFindAndModify: false }
        );

        const Students = await User.find({ role: "student" });
        const notifications = Students.map((Student) => ({
            userId: Student._id,
            message: `New study material uploaded: ${req.file.originalname}`,
        }));
        await Notification.insertMany(notifications);
        res.status(201).json({ newMaterial, message: "Material uploaded and notification sent" });
    }
    } catch (error) {
        res.status(500).json({ message: "Error uploading material", error });
    }
};

const fetchMaterial = async (req, res) => {
    try {
        const materials = await Material.find();
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ message: "Error fetching materials" });
    }
};

module.exports = { uploadMaterial, fetchMaterial };