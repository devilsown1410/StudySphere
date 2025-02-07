const express=require('express')
const {uploadMaterial,fetchMaterial}=require('../Controllers/material')
const router=express.Router()
const verifyToken=require('../middlewares/authMiddleware')
const upload=require('../Config/multer')

router.post('/',verifyToken,upload.single('file'),uploadMaterial);
router.get('/',verifyToken,fetchMaterial)

module.exports=router;