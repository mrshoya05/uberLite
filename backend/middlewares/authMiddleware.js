const captainSchema = require('../modles/captainSchema');
const userModel = require('../modles/user.model');
const jwt = require('jsonwebtoken');
const blackListTokenSchema  = require('../modles/blackListTokenSchema')

exports.authUser = async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized user" });
    }

    const isBlackListToken = await blackListTokenSchema.findOne({token: token});

    if(isBlackListToken){
        return res.status(401).json({
            mrssage: " unAuthorizes user !"
        });
    }

    try {
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded._id);
        const user = await userModel.findById(decoded._id);
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in auth middleware:", error.message);
        return res.status(401).json({
            message: "Unauthorized user!",
        });
    }
};


module.exports.authCaptain = async (req, res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    const isBlackListToken = await blackListTokenSchema.findOne({ token: token });
    if(isBlackListToken){
        return  res.status(401).json({
            message : 'Unauthorized'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        
        const captain = await captainSchema.findById(decoded._id);
        console.log(captain);
        
        req.captain = captain;
     next();
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized !"
        })
    }
}