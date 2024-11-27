const userModel = require('../modles/user.model');
const userService = require('../services/user.services');
const { validationResult} = require('express-validator')

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