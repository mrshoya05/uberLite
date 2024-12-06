const blackListTokenSchema = require("../modles/blackListTokenSchema");
const captainSchema = require("../modles/captainSchema")

const createCaptain = require('../services/captain.service');
const {validationResult} = require('express-validator')
module.exports.registerCaptain = async (req, res)=>{
     const errors = validationResult(req);
     if(!errors.isEmpty){
        return res.status(480)
     }
     const { fullname, email, password, vehicle } = req.body;

     const isCaptainAlreadyExist = await captainSchema.findOne({ email });
 
     if (isCaptainAlreadyExist) {
         return res.status(400).json({ message: 'Captain already exist' });
     }
 
 
     const hashedPassword = await captainSchema.hashPassword(password);
 
     const captain = await createCaptain.createCaptain({
         firstname: fullname.firstname,
         lastname: fullname.lastname,
         email,
         password: hashedPassword,
         color: vehicle.color,
         plate: vehicle.plate,
         capacity: vehicle.capacity,
         vehicleType: vehicle.vehicleType
     });
 
     const token = captain.generateAuthToken();
 
     res.status(201).json({ token, captain });
}

module.exports.loginCaptain = async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { email, password } = req.body;

    const captain = await captainSchema.findOne({email}).select('+password');
    if(!captain){
        return res.status(401).json({message: 'Invalid  email or password'});

    }

    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({
            message: 'Invalid password '
        });
    }
    const token = captain.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({
        token, captain
    });
}

//profile controller


module.exports.getCaptainProfile = async (req, res)=>{
    res.status(200).json({
        captain: req.captain
    });
}


module.exports.logoutCaptain = async (req, res)=>{
   const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
   await blackListTokenSchema.create({
    token
   });
   res.clearCookie('token');
   res.status(200).json({
    message: "User logout sucessfully !"
   })
}