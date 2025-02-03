import { deleteJobController, getjobsController, jobController, jobStatsController, updateJobController } from "../controllers/jobsController.js";
import userAuth from '../middelwares/authMiddelware.js';
import express from 'express';

const router = express.Router();

router.post("/create-jobs",userAuth,jobController)

router.get('/get-jobs',userAuth,getjobsController)

router.patch('/update-jobs/:id',userAuth,updateJobController)

router.delete('/delete-jobs/:id',userAuth,deleteJobController)
router.get('/jobs-stats',userAuth,jobStatsController)
export default router;