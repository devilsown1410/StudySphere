const express=require('express')
const router=express.Router()
const {fetchUser,updateUser} =require('../Controllers/User');
const verifyToken = require('../middlewares/authMiddleware');

router.get("/:email",verifyToken,fetchUser);
router.put("/:email",verifyToken,updateUser);
router.get("/:email/progess",verifyToken,userProgress);

module.exports=router;