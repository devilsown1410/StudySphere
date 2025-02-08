const admin = require("firebase-admin");
const serviceAccount = require("../admin-sdk.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// const verifyUniversity=async(req,res,next)=>{
//   const universityDomain=req.user.email.split("@")[1];
//   if(!universityDomain.includes("gla.ac.in")){
//     return res.status(403).json({message:"Access Denied"});
//   }
//   next();
// }

module.exports = verifyToken;
