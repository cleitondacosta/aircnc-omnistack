const express = require('express');
const multer = require('multer');

const uploadConfig = require('./config/upload');
const UserController = require('./controller/User');
const SpotController = require('./controller/Spot');
const ProfileController = require('./controller/Profile');
const BookingController = require('./controller/Booking');
const ApprovalController = require('./controller/Approval');
const RejectionController = require('./controller/Rejection');

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

routes.post(
  '/booking/:booking_id/approval',
  ApprovalController.store
);

routes.post(
  '/booking/:booking_id/rejection',
  RejectionController.store
);

module.exports = routes;
