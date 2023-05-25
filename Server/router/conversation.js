import express from 'express';
import * as controller from '../controller/conversationController.js';

const router = express.Router();

router.route('/').post(controller.newConversation);
router.route('/:id').get(controller.getConversation);
router.route('/check-existance').post(controller.checkExistence);
export default router;