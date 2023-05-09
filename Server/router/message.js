// import express from 'express';
// import * as controller from '../controller/messageController.js'

// const router = express.Router();

// router.post('/addmsg',controller.addMessage);
// router.post('/getmsg',controller.getAllMessage);

// export default router;


import { Router } from 'express';
import * as controller from '../controller/messageController.js';

const router = Router();

router.route('/').post(controller.newMessage);
router.route('/:id').get(controller.getMessage);

export default router;