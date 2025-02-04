import express from 'express';

import updateUserController, { profileController } from '../controllers/userController.js';
import userAuth from '../middelwares/authMiddelware.js';


const router = express.Router();
router.post('/profile',userAuth,profileController)

router.put('/update-user',userAuth, updateUserController)

export default router;





