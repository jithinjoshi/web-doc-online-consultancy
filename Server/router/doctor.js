import express from 'express';
import * as controller from '../controller/doctorController.js'
import { Auth, DoctorAuth } from '../Auth/middleware.js';

const router = express.Router();

router.route('/signin').post(controller.login);
router.route('/profile/:id').get(controller.profile);
router.route('/edit/:id').put(controller.edit);
router.route('/schedule/:id').post(controller.schedule);
router.route('/scheduledTime/:id').get(controller.scheduledTime);
router.route('/getMyPatients').get(DoctorAuth,controller.getMyPatients);
router.route('/appointments').get(DoctorAuth,controller.getAppointments);
router.route('/getSingleDoctor/:id').post(controller.getSingleDoctor);
router.route('/getFullProfit/:id').get(controller.getFullPayment);
router.route('/apply-doctor').post(controller.applyForDoctor);
router.route('/get-all-departments').get(controller.getAllDepartments);
router.route('/signup-doctor/:id').get(controller.signupDoctor);
router.route('/addPassword/:id').post(controller.addPassword);
router.route('/leave/:id').put(controller.updateLeave);
router.route('/monthly-report').get(DoctorAuth,controller.monthlyReport);
router.route('/weekly-report').get(DoctorAuth,controller.weeklyReport);
router.route('/daily-report').get(DoctorAuth,controller.getDailyReport);
router.route('/yearly-report').get(DoctorAuth,controller.getYearlyReport);
router.route('/').post(DoctorAuth,controller.getData)
router.route('/salesReport').get(DoctorAuth,controller.getSaleReport);
router.route('/singleAppointment/:id').get(DoctorAuth,controller.singleAppointment);
router.route('/prescriptions/:id').get(DoctorAuth,controller.prescriptions);
router.route('/editPrescription/:id').put(controller.updatePrescription);
router.route('/addprescription').post(controller.addPrescription);
router.route('/deletePrescription/:id').delete(controller.deletePrescription);
router.route('/singlePrescription/:id').get(controller.singlePrescription);
router.route('/getSingleUser/:id').get(controller.getSingleUser);
router.route('/update-timeslots').put(DoctorAuth,controller.addDoctorTimeSlot)




export default router