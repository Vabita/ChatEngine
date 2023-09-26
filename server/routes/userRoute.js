import express from 'express';
const router = express.Router();

import { allUsers, login, register, setAvatar } from '../controller/userController.js';

router.post('/register', register);
router.post('/login', login);
router.post('/setAvatar/:id', setAvatar);
router.get('/allusers/:id', allUsers);



export default router;
