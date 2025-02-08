const express=require('express')
const router=express.Router()
const {fetchUser,updateUser,createUser, codingProfiles} =require('../Controllers/User');
const verifyToken = require('../middlewares/authMiddleware');

router.get("/:email",verifyToken,fetchUser);
router.put("/:email", verifyToken, updateUser);
router.post("/newuser", createUser);
router.get('/coding/:username',verifyToken,codingProfiles);
router.post('/coding', verifyToken, codingProfiles);

module.exports=router;