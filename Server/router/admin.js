import { Router } from 'express';
import * as controller from '../controller/adminController.js'
import { AdminAuth, Auth} from '../Auth/middleware.js';

const router = Router();

router.route('/signup').post(controller.signup);
router.route('/signin').post(controller.signin);
router.route('/addDoctor').post(controller.addDoctor);
router.route('/allDoctors').get(controller.getAllDoctors);
router.route('/addDepartment').post(controller.createDepartment);
router.route('/departments').get(controller.getAllDepartments);
router.route('/patients').get(controller.getAllPatients);
router.route('/delete-doctor/:id').delete(controller.deleteDoctor);
router.route('/delete-department/:id').delete(controller.deleteDepartment);
router.route('/block-user/:id').post(controller.blockUser);
router.route('/edit-doctor/:id').put(controller.editDoctor);
router.route('/notifications').get(controller.getAllNotifications);
router.route('/notificationCount').get(controller.getAllNotificationCount);
router.route('/view-doctor-requests/:id').get(controller.selectedDoctorDetails);
router.route('/approve-doctor/:id').put(controller.doctorApproval);
router.route('/deny-doctor/:id').delete(controller.doctorApproval);
router.route('/doctor-requests').get(controller.doctorRequests);
router.route('/data-count').get(controller.getAllDataCount);
router.route('/sales-monthly').get(controller.getSalesForChart);
router.route('/weeklySales').get(controller.getWeeklyReport);
router.route('/dailySales').get(controller.getDailyReport);
router.route('/yearlySales').get(controller.getYearlyReport);
router.route('/salesReport').get(controller.getSaleReport);
router.route('/').post(AdminAuth,controller.getData)



export default router;