const express = require('express');
const multer = require('multer');

const uploadConfig = require('./config/upload');
const UserController = require('./controller/User');
const SpotController = require('./controller/Spot');
const ProfileController = require('./controller/Profile');
const BookingController = require('./controller/Booking');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/user', UserController.store);

routes.get('/spot', SpotController.index);
routes.post(
  '/spot', 
  upload.single('thumbnail'), 
  SpotController.store
);

routes.get('/profile', ProfileController.show);

routes.post('/spot/:spot_id/booking', BookingController.store);

module.exports = routes;
