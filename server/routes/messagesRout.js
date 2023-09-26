import express from 'express';
const router = express.Router();

import { addMessage, getAllMessage } from '../controller/messageController.js';

router.post('/addMsg', addMessage);
router.post('/getMsg', getAllMessage);



export default router;
