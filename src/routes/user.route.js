const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../helpers/verifyToken');

router.post('/register',userController.register);
router.post('/login', userController.login);
router.get('/get-user',verifyToken, userController.getUser);
router.get('/verifytoken',verifyToken, userController.verifyToken);
router.post("/payments", userController.payment);
router.post("/verify-payment", userController.verifyPayment);
router.put('/update-user',verifyToken, userController.updateUser);

module.exports = router;