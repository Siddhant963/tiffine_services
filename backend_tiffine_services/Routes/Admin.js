const express = require("express");
const router = express.Router();
const { RegisterUser , AddCoustomer , AddSubscription , AddAttendance , login ,logout , getallcoustomers ,getallusers , getallsubscriptions , getallcoustomersbyfillter , createDelivery , getallDeliveries , getallDeliveriesbyfilter , updateDelivery } = require("../Controllers/AdminController");

router.post('/AddStaff' , RegisterUser);
router.post('/AddCoustomer', AddCoustomer);
router.post('/AddSubscription', AddSubscription);
router.post('/AddAttendance', AddAttendance);
router.post('/login', login);
router.post('/logout', logout);
router.get('/getallcoustomers', getallcoustomers);
router.get('/getallusers', getallusers);
router.get('/getallsubscriptions', getallsubscriptions);
router.get('/getallcoustomersbyfillter', getallcoustomersbyfillter);
router.post('/createDelivery', createDelivery);
router.get('/getallDeliveries', getallDeliveries);
router.get('/getallDeliveriesbyfilter', getallDeliveriesbyfilter);
router.post('/updateDelivery', updateDelivery);





module.exports = router;
