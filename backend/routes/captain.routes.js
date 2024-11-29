const expres = require('express');

const  router  = expres.Router();

 const { body  } = require('express-validator');

// register as router 
router.post('/register', [
    body('email').isEmail().withMessage("Invalid email address ! "), 
    body('fullname.firstname').isLength({min})
])

//captain routes 

module.exports = router ; 