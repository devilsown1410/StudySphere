const express=require('express')
const {uploadMaterial,fetchMaterial}=require('../Controllers/Material')
const router=express.Router()
const verifyToken=require('../middlewares/authMiddleware')

router.post('/',verifyToken,uploadMaterial);
router.get('/',verifyToken,fetchMaterial)

module.exports=router;