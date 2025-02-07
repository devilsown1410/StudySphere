const User=require('../Models/User')
const {fetchGitHubProfile,fetchLeetCodeProfile}=require('../utils/codingProfiles')

const fetchUser=async(req,res)=>{
    if(req.user.email !== req.params.email){
        return res.status(403).json({ message: "Access denied" });
    }    
    try{
        const user=await User.findOne({ email:req.params.email }).populate("uploadedMaterials")
        res.json(user)
    }catch(error){
        res.status(500).json({message:"Server error"});
    }
}
const updateUser=async(req,res)=>{
    if(req.user.email !== req.params.email){
        return res.status(403).json({ message: "Access denied" });
    }
    try{
        const updatedUser=await User.findOneAndUpdate({email:req.params.email },req.body,{new:true})
        res.json(updatedUser);
    }catch(error){
        res.status(500).json({ message:"Error updating Profile"});
    }
}

const userProgress=async(req,res)=>{
    try{
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: "User not found" });
        const leetCodeProgress = await fetchLeetCodeProfile(user.codingProfiles.leetcode);
        const gitHubRepos = await fetchGitHubProfile(user.codingProfiles.github);
        res.json({ leetCodeProgress, gitHubRepos });
      } catch (error) {
        res.status(500).json({ message: "Error fetching progress" });
    }
}
const fetchStudents=async(req,res)=>{
    try{
        const students = await User.find({ role: "student" }).select("email codingProfiles");
        res.json(students);
    } catch(error){
    res.status(500).json({ message: "Error fetching students" });
    }
}
const createUser = async (req, res) => {
    try {
        const user=await User.findOne({ email: req.body.email });
        if(user){
            res.status(201).json(user);
        }else{
            const newUser = new User(req.body);
            await newUser.save();
            res.status(201).json({user:newUser});
        }
    } catch (error) {
        res.status(500).json({ message: "Error creating user" });
    }
};
module.exports={fetchUser,updateUser,fetchStudents,createUser}