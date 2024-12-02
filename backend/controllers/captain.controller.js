const captainSchema = require("../modles/captainSchema")

const createCaptain = require('../services/captain.service');
const {validationResult} = require('express-validator')
module.exports.registerCaptain = async (req, res)=>{
     const errors = validationResult(req);
     if(!errors.isEmpty){
        return res.status(480)
     }
}