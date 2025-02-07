const express=require('express')
const router=express.Router()
const verifyToken=require('../middlewares/authMiddleware')

router.get('/',verifyToken,getNotifications);
router.get('/read',verifyToken,readNotification)

module.exports=router;