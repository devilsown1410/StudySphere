const User=require('../Models/User')
const {fetchGitHubProfile,fetchLeetCodeProfile, fetchCodeforcesProfile}=require('../utils/codingProfiles')

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
    try {
        const { email } = req.params;
        const updatedData = req.body;
        const user = await User.findOneAndUpdate({ email }, updatedData, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error updating user profile' });
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

const codingProfiles = async (req, res) => {
  const { leetcode, github, codeforces } = req.body;
  try {
    const leetcodeProfile = await fetchLeetCodeProfile(leetcode);
    const gitHubrepos = await fetchGitHubProfile(github);
    const codeforcesProfile = await fetchCodeforcesProfile(codeforces);
    res.json({
      leetcode: leetcodeProfile,
      github: gitHubrepos,
      codeforces: codeforcesProfile
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching coding stats", error });
  }
};

module.exports={fetchUser,updateUser,fetchStudents,createUser,codingProfiles}