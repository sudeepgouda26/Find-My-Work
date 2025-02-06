import express from 'express';

import { getUserController } from '../controllers/userController.js';
import userAuth from '../middelwares/authMiddelware.js';
import User from '../model/User.js';


const router = express.Router();




// Fetch user data (protected route)
router.get('/get-user', userAuth,getUserController ) 



// router.put('/update-user',userAuth, updateUserController)

export default router;





