const express  = require("express")
const routes = express.Router();
const {body , validationResult} = require('express-validator')
const User = require('../models/User')
const fetchuser = require('../middleware/fetchuser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_sec = "Aniskhan1234"
const nodemailer = require("nodemailer")
// const otpgenerator = require("otp-generator")




// update password api
// console.log( sharedOTP + "sharedotp")
routes.post('/changepassword', fetchuser, async (req, res) => {
  try {
    // const email = req.body.email;
    const providedOTPtochnagepassword = req.body.otp;
 
      //  (matching the one sent)
    const otppass = sharedOTP
    // console.log(otppass + "otppass");
      if (providedOTPtochnagepassword !== otppass) {
        return res.status(400).json({ success, message: "Invalid OTP" });
      }

    const salt = await bcrypt.genSalt(10);
    const secnewpass = await bcrypt.hash(req.body.newpassword, salt);
    await User.findByIdAndUpdate(req.user.id, { password: secnewpass });
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to change password" });
  }
});


//  forgot password

routes.post('/forgotpassword', async (req, res) => {
try {
    const email = req.body.email;
    const providedOTP = req.body.otp;
    const newPassword = req.body.newpassword;

    // Fetch the stored OTP from your server (e.g., from the in-memory object or database)
    
const otppass = sharedOTP

  if (providedOTP !== otppass) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Hash the new password and update it in the database
    const salt = await bcrypt.genSalt(10);
    const secnewpass = await bcrypt.hash(newPassword, salt);

    await User.findOneAndUpdate({ email }, { password: secnewpass });

    // Remove the used OTP from your server

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to change password' });
  }
});

  


routes.post(
  "/createuser",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("name", "Enter a valid name with at least 5 characters").isLength({ min: 5 }),
    body("password", "Password must be at least 5 characters long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, profile, class: userClass, facultyId } = req.body;

      if (profile === "student" && !userClass) {
        return res.status(400).json({ errors: [{ msg: "Class is required for students." }] });
      }

      if (profile === "admin" && !facultyId) {
        return res.status(400).json({ errors: [{ msg: "Faculty ID is required for admins." }] });
      }

      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: "User with this email already exists." }] });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);

      user = await User.create({
        name,
        email,
        password: secPass,
        profile,
        class: profile === "student" ? userClass : undefined,
        facultyId: profile === "admin" ? facultyId : undefined,
      });

      const token = jwt.sign({ user: { id: user.id } }, jwt_sec);
      return res.json({ message: "User registered successfully!", token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// login

routes.post('/login', [
  body('email' , 'Enter valid Email').isEmail(),
  body('password' , 'Enter valid password').exists(), 
], async (req, res ) =>{
  let success  = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 
  const {email , password} = req.body
  try {
    const user =  await User.findOne({email});
    if(!user){
      return res.status(400).json({ success ,errors: "Please enter valid  credentails" });
    }
    const compare = await bcrypt.compare(password , user.password)
    if(!compare){
      return res.status(400).json({ success , errors: "Please enter valid  credentails" });
    }
    const data = {
      user:{
        id:user.id
      }
    }
    const token = await jwt.sign(data, jwt_sec);
    success = true
    res.json({ success ,token})
    
  } catch (error) {
    success = false
    console.log(error.message)
    res.status(5000).send(success , "Some Error occured")   
  }
})



// getuser

routes.post('/getuser',fetchuser, async (req, res ) =>{
  try {
   const userID =await req.user.id; 
   const user = await  User.findById(userID).select("-password")
   res.send(user)
  } catch (error) {
    console.log(error.message)
    res.status(5000).send("Some Error occured")   
  }
})
module.exports = routes; 