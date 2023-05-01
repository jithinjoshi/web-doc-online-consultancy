import express from 'express';
import * as controller from '../controller/messageController.js'

const router = express.Router();

router.post('/addmsg',controller.addMessage);
router.post('/getmsg',controller.getAllMessage);

export default router;