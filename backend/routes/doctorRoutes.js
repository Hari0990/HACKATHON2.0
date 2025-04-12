const express = require('express');
const authController = require('../controllers/authController');
const doctorController = require('../controllers/doctorController');

const router = express.Router();

// Authentication routes
router.post('/signup', authController.doctorSignup);
router.post('/login', authController.doctorLogin);

// Protected routes
router.use(authController.protectDoctor);

router.get('/me', doctorController.getMe, doctorController.getDoctor);
router.patch('/updateMe', doctorController.updateMe);
router.patch('/updateMyPassword', authController.updatePassword);
router.patch('/updateAvailability', doctorController.updateAvailability);

// Routes for managing appointments
router.get('/myAppointments', doctorController.getMyAppointments);
router.patch('/appointments/:id', doctorController.updateAppointmentStatus);

// Admin routes
router.use(authController.restrictTo('admin'));

router.route('/')
  .get(doctorController.getAllDoctors)
  .post(doctorController.createDoctor);

router.route('/:id')
  .get(doctorController.getDoctor)
  .patch(doctorController.updateDoctor)
  .delete(doctorController.deleteDoctor);

module.exports = router;