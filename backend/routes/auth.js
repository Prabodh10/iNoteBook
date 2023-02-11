const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
fetchuser

const JWT_SECRET = 'Prabodhisagoodb$oy';


// ROUTE 1: create User using: POST "/api/auth/createuser". No login required

router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter name which contains 6 characters').isLength({ min: 5 }),
    body('password', 'Password should contain at least 5 characters').isLength({ min: 5 }),
] , async (req, res) =>{
    let success = false;
//If there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
// check whether user with this email exist already
try{


   let user = await User.findOne({email : req.body.email});
//    console.log(user)
    if(user){
        return res.status(400).json({success, error : "Sorry a user with this email already exist"})
    }
    var salt = await bcrypt.genSaltSync(10);
    let secPass = await bcrypt.hash(req.body.password, salt);
    //create a user
   user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

    const data = {
            user : {
                    id: user.id
                   }
                 }


    const authtoken = jwt.sign(data, JWT_SECRET);
    // console.log(jwtData);

    // res.json(user)
    success = true;
    res.json({success, authtoken})


} catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
}
})


//ROUTE 2:Authenticating a User using: "/api/auth/login". No login required


router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
] , async (req, res) =>{
    let success = false;

//If there are errors, return Bad Request and the errors
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}

const {email, password} = req.body;
try {
    let user = await User.findOne({email});
    if(!user){
        success = false;
        return res.status(400).json({error : "Please try to login with correct credentials"});

    }

    const passwordcompare = await bcrypt.compare(password, user.password);
    if(!passwordcompare){
        success = false;
        return res.status(400).json({success, error : "Please try to login with correct credentials"});
    }

    const data = {
        user : {
                id: user.id
               }
             }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authtoken})


} catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
}

})

//ROUTE 3: Get loggedin user Details using: "/api/auth/getuser". Login required

router.post('/getuser', fetchuser, async (req, res) =>{

try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)

} catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
}
})
module.exports = router