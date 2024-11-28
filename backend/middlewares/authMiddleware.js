const userModel = require('../modles/user.model');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res, next) => {

    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized user" });
    }

    const isBlackListToken = await userModel.findOne({token: token});

    if(isBlackListToken){
        return res.status(401).json({
            mrssage: " unAuthorizes user !"
        });
    }

    try {
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded._id);

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
