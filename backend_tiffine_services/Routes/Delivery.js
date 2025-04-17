const express = require('express');
const router = express.Router();
const {login, getDeliveriesById, getAllDeliveries, markDeliveryAsComplete} = require('../Controllers/Deliverycontroller');

router.post('/login', login);
router.get('/deliveries', getAllDeliveries);
router.get('/deliveries/:delivery_person_id', getDeliveriesById);   
router.get('/deliveries/:customer_id', getDeliveriesById);
router.get('/deliveries/:delivery_date', getDeliveriesById);
router.get('/deliveries/:status', getDeliveriesById);
router.put('/deliveries/:deliveryId/complete', markDeliveryAsComplete);


module.exports = router;