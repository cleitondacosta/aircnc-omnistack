const express = require('express');
const multer = require('multer');

const uploadConfig = require('./config/upload');
const UserController = require('./controller/User');
const SpotController = require('./controller/Spot');
const ProfileController = require('./controller/Profile');
const BookingController = require('./controller/Booking');

const router = express.Router();
const upload = multer(uploadConfig);

router.post('/user', UserController.store);

router.get('/spot', SpotController.index);
router.post(
  '/spot', 
  upload.single('thumbnail'), 
  SpotController.store
);

router.get('/profile', ProfileController.show);

router.post('/spot/:spot_id/booking', BookingController.store);

module.exports = router;
