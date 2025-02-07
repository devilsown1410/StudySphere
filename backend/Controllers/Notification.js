const Notification=require('../Models/Notification')

const getNotifications=async(req,res)=>{
    try{
        const notifications=await Notification.find({ userId:req.user.id,isRead:false});
        res.json(notifications);
    }catch(error){
        res.status(500).json({message:"Error fetching notifications"});
    }
}

const readNotification=async(req,res)=>{
    try{
        await Notification.updateMany({ userId: req.user.id},{isRead:true});
        res.json({message:" Notifications marked as read"});
    }catch(error){
        res.status(500).json({message:"Error updating notifications"})
    }
}

module.exports={getNotifications,readNotification};