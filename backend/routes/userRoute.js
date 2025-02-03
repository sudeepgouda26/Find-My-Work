import express from 'express';

import updateUserController from '../controllers/userController.js';


const router = express.Router();

router.put('/update-user', updateUserController)

export default router;





