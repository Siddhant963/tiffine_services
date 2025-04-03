const Usermodel = require('../Models/Usermodel');
const Subscriptionmodel = require('../Models/Subscription');
const CoustomerModel = require('../Models/Coustomer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParsar = require('cookies-parsar');
require('dotenv').config();
module.exports.RegisterUser = async(res,req )=>{ 
     const {name , email , password , contact , total_salary , roles } = req.body;
     if(!name || !email || !password || !contact || !total_salary || !roles){
          return res.status(400).json({message: "All fields are required"});
     }
     let user = await Usermodel.findOne({email});
     if(user){
          return res.status(400).json({message: "User already exists"});
     }else{ 
          const hashedPassword = await bcrypt.hash(password, 10);
          user = new Usermodel({
               name,
               email,
               password: hashedPassword,
               contact,
               total_salary,
               roles
          });
          await user.save();
          return res.status(200).json({message: "User registered successfully"});
     }
}

module.exports.AddCoustomer = async(req , res)=>{ 
     const {name , email , contact , address , subscription , subscription_start_date , subscription_end_date } = req.body;
     if(!name || !email || !contact || !address || !subscription || !subscription_start_date || !subscription_end_date){
          return res.status(400).json({message: "All fields are required"});
     }
     let coustomer = await Usermodel.findOne({email});
     if(coustomer){
          return res.status(400).json({message: "Coustomer already exists"});
     }else{ 
          coustomer = new CoustomerModel({
               name,
               email,
               contact,
               address,
               subscription,
               subscription_start_date,
               subscription_end_date
          });
          await coustomer.save();
          return res.status(200).json({message: "Coustomer added successfully"});
     }

}

module.exports.AddSubscription = async(req,res)=>{ 
     const {name , price , duration , meals } = req.body;
     if(!name || !price || !duration || !meals){
          return res.status(400).json({message: "All fields are required"});
     }
     let subscription = await Usermodel.findOne({name});
     if(subscription){
          return res.status(400).json({message: "Subscription already exists"});
     }else{ 
          subscription = new Subscriptionmodel({
               name,
               price,
               duration,
               meals
          });
          await subscription.save();
          return res.status(200).json({message: "Subscription added successfully"});
     }

}

module.exports.AddAttendance = async(req,res)=>{
     const {user_id , date , status } = req.body;
     if(!user_id || !date || !status){
          return res.status(400).json({message: "All fields are required"});
     }
     let attendance = await Usermodel.findOne({user_id , date});
     if(attendance){
          return res.status(400).json({message: "Attendance already exists"});
     }else{ 
          attendance = new AttendanceModel({
               user_id,
               date,
               status
          });
          await attendance.save();
          return res.status(200).json({message: "Attendance added successfully"});
     }

}

module.exports.login = async(req,res) => {
     const {email , password} = req.body;
     if(!email || !password){
          return res.status(400).json({message: "All fields are required"});
     }
     let user = await Usermodel.findOne({email});
     if(!user){
          return res.status(400).json({message: "User not found"});
     }else{ 
          const isMatch = await bcrypt.compare(password, user.password);
          if(!isMatch){
               return res.status(400).json({message: "Invalid credentials"});
          }else{ 
               const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
               res.cookie('token', token, {httpOnly: true});
               return res.status(200).json({message: "Login successful", token});
          }
     }
}

module.exports.logout = (req,res) => {
     res.clearCookie('token');
     return res.status(200).json({message: "Logged out successfully"});
}





