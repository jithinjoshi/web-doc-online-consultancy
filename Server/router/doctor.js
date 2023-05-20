import express from 'express';
import * as controller from '../controller/doctorController.js'
import { Auth } from '../Auth/middleware.js';

const router = express.Router();

router.route('/signin').post(controller.login);
router.route('/profile/:id').get(controller.profile);
router.route('/edit/:id').put(controller.edit);
router.route('/schedule/:id').post(controller.schedule);
router.route('/scheduledTime/:id').get(controller.scheduledTime);
router.route('/getMyPatients/:id').get(controller.getMyPatients);
router.route('/appointments/:id').get(controller.getAppointments);
router.route('/getSingleDoctor/:id').post(controller.getSingleDoctor);
router.route('/getFullProfit/:id').get(controller.getFullPayment);
router.route('/apply-doctor').post(controller.applyForDoctor);
router.route('/get-all-departments').get(controller.getAllDepartments);
router.route('/signup-doctor/:id').get(controller.signupDoctor);
router.route('/addPassword/:id').post(controller.addPassword);
router.route('/leave/:id').put(controller.updateLeave);



export default router