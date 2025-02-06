const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:String,
    email:{type:String,unique:true,required:true},
    bio:String,
    profilePicture:String,
    codingProfiles:{
        github:String,
        leetcode:String,
        codechef:String,
    },
    uploadedMaterials:[{type:mongoose.Schema.Types.ObjectId,ref:"Material"}],

})
module.exports=mongoose.model("User",userSchema)