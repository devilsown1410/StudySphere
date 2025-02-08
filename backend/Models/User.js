const mongoose=require('mongoose')

const codingProfileSchema = new mongoose.Schema({
  platform: String,
  link: String,
  username: String
});

const userSchema=new mongoose.Schema({
    name:String,
    email:{type:String,unique:true,required:true},
    uid:String,
    bio:String,
    role:String,
    profilePicture:String,
    codingProfiles: [codingProfileSchema],
    uploadedMaterials:[{type:mongoose.Schema.Types.ObjectId,ref:"Material"}],
})

module.exports=mongoose.model("User",userSchema)