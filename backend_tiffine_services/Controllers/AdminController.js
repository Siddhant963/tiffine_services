const Usermodel = require('../Models/Usermodel');
const Subscriptionmodel = require('../Models/Subscription');
const Coustomermodel = require('../Models/Coustomer')
const Deliverymodel = require('../Models/delivery');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParsar = require('cookie-parser');
require('dotenv').config();

module.exports.RegisterUser = async(req , res )=>{ 
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
          return res.status(400).json({message: "All fields are required" });
     }
     let coustomer = await Coustomermodel.findOne({email});
     if(coustomer){
          return res.status(400).json({message: "Coustomer already exists"});
     }else{ 
          coustomer = new Coustomermodel({
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
          return res.status(200).json({message: "Subscription added successfully", data: subscription});
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

module.exports.getallcoustomers = async(req,res) => {
     try {
          const coustomers = await Coustomermodel.find();
          return res.status(200).json({message: "Coustomers fetched successfully", data: coustomers});
     } catch (error) {
          return res.status(500).json({message: "Internal server error"});
     }
}
module.exports.getallusers = async(req,res) => {
     try {
          const users = await Usermodel.find();
          return res.status(200).json({message: "Users fetched successfully", data: users});
     } catch (error) {
          return res.status(500).json({message: "Internal server error"});
     }
}
module.exports.getallsubscriptions = async(req,res) => {
     try {
          const subscriptions = await Subscriptionmodel.find();
          return res.status(200).json({message: "Subscriptions fetched successfully", data: subscriptions});
     } catch (error) {
          return res.status(500).json({message: "Internal server error"});
     }
} 

module.exports.getallcoustomersbyfillter = async(req,res) => {
     const {name , email , contact , address , subscription , subscription_start_date , subscription_end_date } = req.body;
     const filter = {};
     if(name){
          filter.name = name;
     }
     if(email){
          filter.email = email;
     }
     if(contact){
          filter.contact = contact;
     }
     if(address){
          filter.address = address;
     }
     if(subscription){
          filter.subscription = subscription;
     }
     if(subscription_start_date){
          filter.subscription_start_date = subscription_start_date;
     }
     if(subscription_end_date){
          filter.subscription_end_date = subscription_end_date;
     }
     try {
    
          
          const coustomers = await Coustomermodel.find(filter);
          if(coustomers.length === 0){
               return res.status(404).json({message: "No coustomers found"});
          }
          return res.status(200).json({message: "Coustomers fetched successfully", data: coustomers});
     } catch (error) {
          return res.status(500).json({message: "Internal server error"});
     }
}

module.exports.createDelivery = async(req,res) => {
     const { delivery_person_id, customer_id, delivery_date, status } = req.body;
     if(!delivery_person_id || !customer_id || !delivery_date || !status){
          return res.status(400).json({message: "All fields are required"});
     }
     let delivery = await Deliverymodel.findOne({delivery_person_id , customer_id , delivery_date});
     if(delivery){
          return res.status(400).json({message: "Delivery already exists"});
     }else{ 
          delivery = new Deliverymodel({
               delivery_person_id,
               customer_id,
               delivery_date,
               status
          });
          await delivery.save();
          return res.status(200).json({message: "Delivery added successfully"});
     }
}
module.exports.getallDeliveries = async(req,res) => {
     try {
          const deliveries = await Deliverymodel.find();
          return res.status(200).json({message: "Deliveries fetched successfully", data: deliveries});
     } catch (error) {
          return res.status(500).json({message: "Internal server error"});
     }
}
module.exports.getallDeliveriesbyfilter = async(req,res) => {
     const { delivery_person_id, customer_id, delivery_date, status } = req.body;
     if(!delivery_person_id && !customer_id && !delivery_date &&!status){
          return res.status(400).json({message: "At least one filter is required"});
     }
     const filter = {};
     if(delivery_person_id){
          filter.delivery_person_id = delivery_person_id;
     }
     if(customer_id){
          filter.customer_id = customer_id;
     }
     if(delivery_date){
          filter.delivery_date = delivery_date;
     }
     if(status){
          filter.status = status;
     }

     
     try {
          const deliveries = await Deliverymodel.find(filter);
          if(deliveries.length === 0){
               return res.status(404).json({message: "No deliveries found"});
          }
          return res.status(200).json({message: "Deliveries fetched successfully", data: deliveries});
     } catch (error) {
          return res.status(500).json({message: "Internal server error"});
     }
}

module.exports.updateDelivery = async (req, res) => {
     const { delivery_id, customer_id, status } = req.body;
 
     if (!delivery_id || !customer_id || !status) {
         return res.status(400).json({ message: "delivery_id, customer_id, and status are required" });
     }
 
     try {
         const delivery = await Deliverymodel.findById(delivery_id);
         if (!delivery) {
             return res.status(404).json({ message: "Delivery not found" });
         }
 
         const previousStatus = delivery.status;
         delivery.status = status;
         await delivery.save();
 
         // If status changed to "delivered" and wasn't already "delivered", decrement meal count
         if (status.toLowerCase() === "delivered" && previousStatus.toLowerCase() !== "delivered") {
             const customer = await Coustomermodel.findById(customer_id);
 
             if (!customer) {
                 return res.status(404).json({ message: "Customer not found" });
             }
             const subscription = await Subscriptionmodel.findById(customer.subscription);
                if (!subscription) {
                    return res.status(404).json({ message: "Subscription not found" });
                    }
                if (subscription.meals > 0) {
                    console.log("Meals left in subscription:", subscription.meals);
                    
                    subscription.meals -= 1;
                    console.log("Meals left in subscription after decrement:", subscription.meals);
                    await subscription.save();
                    } else {
                    return res.status(400).json({ message: "No meals left in subscription" });
                    }

         }
 
         return res.status(200).json({ message: "Delivery status updated successfully" });
 
     } catch (error) {
         console.error("Error updating delivery status:", error);
         return res.status(500).json({ message: "Server error" });
     }
 };

module.exports.updateCoustomer = async (req, res) => {
     const { coustomer_id, name, email, contact, address, subscription, subscription_start_date, subscription_end_date } = req.body;
 
     if (!coustomer_id) {
         return res.status(400).json({ message: "Coustomer ID is required" });
     }
 
     try {
         const coustomer = await Coustomermodel.findById(coustomer_id);
         if (!coustomer) {
             return res.status(404).json({ message: "Coustomer not found" });
         }
 
         if (name) coustomer.name = name;
         if (email) coustomer.email = email;
         if (contact) coustomer.contact = contact;
         if (address) coustomer.address = address;
         if (subscription) coustomer.subscription = subscription;
         if (subscription_start_date) coustomer.subscription_start_date = subscription_start_date;
         if (subscription_end_date) coustomer.subscription_end_date = subscription_end_date;
 
         await coustomer.save();
 
         return res.status(200).json({ message: "Coustomer updated successfully" });
 
     } catch (error) {
         console.error("Error updating coustomer:", error);
         return res.status(500).json({ message: "Server error" });
     }
 };

 module.exports.rechargesubscription = async (req, res) => {
     const { coustomer_id, subscription_id } = req.body;
     
          if (!coustomer_id || !subscription_id) {
          return res.status(400).json({ message: "Coustomer ID and Subscription ID are required" });
          }
     
          try {
          const coustomer = await Coustomermodel.findById(coustomer_id);
          if (!coustomer) {
               return res.status(404).json({ message: "Coustomer not found" });
          }
     
          const subscription = await Subscriptionmodel.findById(subscription_id);
          if (!subscription) {
               return res.status(404).json({ message: "Subscription not found" });
          }
     
          coustomer.subscription = subscription.name;
          coustomer.subscription_start_date = new Date();
          coustomer.subscription_end_date = new Date(new Date().setMonth(new Date().getMonth() + subscription.duration));
     
          await coustomer.save();
     
          return res.status(200).json({ message: "Subscription recharged successfully" });
     
          } catch (error) {
          console.error("Error recharging subscription:", error);
          return res.status(500).json({ message: "Server error" });
          }
     }