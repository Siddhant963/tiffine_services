const Usermodel = require('../Models/Usermodel');
const Subscriptionmodel = require('../Models/Subscription');
const Coustomermodel = require('../Models/Coustomer')
const Deliverymodel = require('../Models/delivery');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParsar = require('cookie-parser');
require('dotenv').config();

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const user = await Usermodel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.getAllDeliveries =  async (req, res) => {
        try {
            const delivery = await Deliverymodel.find();
            res.status(200).json(delivery);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    module.exports.getDeliveriesById = async(req,res) => {
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
   };

module.exports.markDeliveryAsComplete = async (req, res) => {
    const { deliveryId } = req.params;
    if (!deliveryId) {
        return res.status(400).json({ message: "Delivery ID is required" });
    }
    try {
        const delivery = await Deliverymodel.findByIdAndUpdate(deliveryId, { status: 'completed' }, { new: true });
        if (!delivery) {
            return res.status(404).json({ message: "Delivery not found" });
        }
        return res.status(200).json({ message: "Delivery marked as completed", delivery });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

