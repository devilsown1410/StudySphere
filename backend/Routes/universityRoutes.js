const express=require('express');
const router=express.Router();
const verifyToken=require("../middlewares/authMiddleware")
const {fetchMaterial}=require('../Controllers/material')
const { fetchStudents } = require('../Controllers/User');
const { verifyUniversity }=require('../middlewares/authMiddleware')

router.use(verifyUniversity);
router.get("/materials",verifyToken,fetchMaterial);
router.get("/students",verifyToken,fetchStudents);

module.exports=router;