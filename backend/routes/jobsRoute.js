import { deleteJobController, getJobByIdController, getjobsController, jobController, jobStatsController, updateJobController } from "../controllers/jobsController.js";
import userAuth from '../middelwares/authMiddelware.js';
import express from 'express';

const router = express.Router();

router.post("/create", userAuth, jobController); // Ensure this route is correctly defined

router.get('/get-jobs', userAuth, getjobsController);



router.put('/update-jobs/:id', userAuth, updateJobController);

router.delete('/delete-jobs/:id', userAuth, deleteJobController);
router.get('/jobs-stats', userAuth, jobStatsController);
router.get("/:id", getJobByIdController);

export default router;