const expres = require('express');

const  router  = expres.Router();

 const { body  } = require('express-validator');

// register as router 
router.post('/register', [
    body('email').isEmail().withMessage("Invalid email address ! "), 
    body('fullname.firstname').isLength({min: 3}).withMessage("Must be 3 character longer !"),
    body('password').isLength({min : 6}).withMessage("Password must contain at least 6 character !"),
    body('vehicle.color').isLength({min: 3}).withMessage("color should be valid !"),
    body('vehicle.plate').isLength({min: 3}).withMessage(" Invalid plate number !"),
    body('vehicle.capacity').isLength({min: 1}).withMessage("Invalid capacity !"),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage(' choose valid vehicleType !')
])

//captain routes 

module.exports = router ; 