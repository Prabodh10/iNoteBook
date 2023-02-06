const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


//create User using: POST "/api/auth/createuser". No login required

router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter name which contains 6 characters').isLength({ min: 5 }),
    body('password', 'Enter a Valid password').isLength({ min: 5 }),
] , async (req, res) =>{
//If there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
// check whether user with this email exist already
try{


   let user = await User.findOne({email : req.body.email});
//    console.log(user)
    if(user){
        return res.status(400).json({error : "Sorry a user with this email already exist"})
    }
    //create a user
   user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
      
    //   .then(user => res.json(user))
    //   .catch(err=> {console.log(err)
    // res.json({error: 'Please enter a unique value for email',message: err.message})})
    //  res.send(req.body);
    res.json(user)
}catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured")
}
}
)

module.exports = router