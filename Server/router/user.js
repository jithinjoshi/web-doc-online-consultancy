import express from 'express'
const router = express.Router();
import { Auth } from '../Auth/middleware.js';


import * as controller from '../controller/userController.js'

//post
router.route('/register').post(controller.register);
router.route('/register-with-google').get(controller.googleRegister);
router.route('/login-with-google').get(controller.googleLogin)
router.route('/login').post(controller.login);
router.route("/user").get(Auth, controller.getUser);
router.route('/doctors').get(controller.getAllDoctors);
router.route('/availableSlots/:id').get(controller.getDoctorAvailability);
router.route('/doctor/:id').get(controller.getSingleDoctor);
router.route('/doctor/appointment').post(controller.appointment);
// router.route('/doctor/timings').post(controller.manageTimings);
// router.route('/doctor/updateTimings').put(controller.updateTimings);
router.route('/doctor/checkAvailability').post(controller.checkAvailability);
router.route('/payment').post(controller.payment);

router.route('/login-with-otp').post(controller.loginWithOtp);
router.route('/forgot-password').post(controller.forgotPassword);
router.route('/reset-password/:id/:token').post(controller.resetPassword);
router.route('/get-all-departments').get(controller.getAllDepartments);
router.route('/update-appointment').put(controller.appointmentUpdate);
router.route('/tokens').get(controller.getToken);
router.route('/webhook').post(express.json({type:'application/json'}), controller.handleWebhook);
router.route('/my-appointments/:status/:id').get(controller.getMyAppointment);
router.route('/my-doctors/:id').get(controller.getMyDoctors);
router.route('/get-profile/:id').get(controller.getUserProfile);
router.route('/updateProfile/:id').put(controller.updateProfile);
router.route('/getSingleUser/:id').post(controller.getSingleUser);
router.route('/apply-doctor').post(controller.applyForDoctor);
router.route('/profile').put(Auth,controller.profile);
router.route('/appointedDoctors').get(Auth,controller.getAppointedDoctors);
router.route('/prescriptions/:doctorId').get(Auth,controller.getPrescriptions);



export default router; 