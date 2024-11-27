const express = require('express');
const { register } = require('../controllers/user.controller');

const userRoutes = express.Router();
const {body} = require('express-validator');


userRoutes.post('/register', [
    body('email').isEmail().withMessage('Invalid Message'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name should be more then 3 characters '),
    body('password').isLength({min: 6}).withMessage('password must be valid')
], register);

userRoutes.post('/login', [
    body('email').isEmail().withMessage('invalid mail '), 
    body('password').isLength({min: 6}).withMessage("invalid password !")
])


module.exports = userRoutes; 