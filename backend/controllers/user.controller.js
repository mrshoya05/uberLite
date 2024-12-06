const userModel = require('../modles/user.model');
const userService = require('../services/user.services');
const { validationResult} = require('express-validator')
const blkackListToken = require('../modles/blackListTokenSchema');
exports.register = async (req, res)=>{
   
   const error = validationResult(req);
   if(!error.isEmpty()){
    return res.status(400).json({
        error: error.array()
    });
   }
   const {fullname, email, password} = req.body; 

   const hashPassword = await userModel.hashPassword(password);


   const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword
});


   const token = user.generateAuthToken();

   res.status(201).json({
    token, 
    user
   });

}



// login 
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const { email, password } = req.body;

 
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
       
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = user.generateAuthToken();
        res.cookie('token', token);
        res.status(200).json({ token, user });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


//get user profile 

exports.getUserProfile = async (req, res)=>{
console.log("test");

try {
    if (!req.user) {
        return res.status(401).json({
            message: "User not authenticated"
        });
    }
    res.status(200).json({
        user: req.user
    });

} catch (error) {
    res.status(401).json({
        message: "not found token "
    })
}
}


//logout user 

exports.logout = async (req, res)=>{
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  
  await blkackListToken.create({token});
  
  res.status(200).json({
    message: "Logged out !"
  })
}