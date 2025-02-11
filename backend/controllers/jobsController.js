import mongoose from "mongoose";
import PartTimeJob from "../model/partTimeJob.js";
import moment from "moment/moment.js";







export const jobController = async (req, res, next) => {
    try {
        const { jobTitle, description,  salary, location,details } = req.body;

        if (!jobTitle || !description ||  !salary ||!location ||!details) {
            return res.status(400).send({
                success: false,
                message: "All fields are required",
            });
        }

        const contact = { postedBy: req.user.userId };

 
        req.body.postedBy = req.user.userId;  // Assign the userId from the decoded JWT
        const job = await PartTimeJob.create({
            jobTitle,
            description,
            salary,
            location,
            details,
            contact, // Pass the contact object with postedBy
        });

        return res.status(200).send({
            success: true,
            message: "Job posted successfully",
            job,
        });
    } catch (error) {
        next(error);  // Pass errors to the next middleware (e.g., error handling middleware)
    }
};










export const getjobsController = async (req, res, next) => {
    try {
        const jobs = await PartTimeJob.find(); // Fetch all jobs without filtering by userId

        return res.status(200).json({
            success: true,
            totalJobs: jobs.length,
            jobs,
        });
    } catch (error) {
        next(error);
    }
};

export const getJobByIdController = async (req, res, next) => {
    try {
        const job = await PartTimeJob.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }
        res.status(200).json({ success: true, job });
    } catch (error) {
        next(error);
    }
};




export const updateJobController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { jobTitle, description, location,status, salary, details } = req.body;

        // Validate required fields
        if (!jobTitle || !location || !salary || !details || !description || !status) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Find the job
        const job = await PartTimeJob.findById(id);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        // Authorization check (Ensure the logged-in user is the owner of the job)
        if (req.user.userId !== job.contact.postedBy.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this job",
            });
        }

        // Update the job details
        const updatedJob = await PartTimeJob.findByIdAndUpdate(
            id,
            { jobTitle, description, location, salary,status, details },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: "Job updated successfully",
            job: updatedJob,
        });

    } catch (error) {
        next(error); // Pass the error to middleware for centralized handling
    }
};










export const jobStatsController = async (req, res) => {
    try {
        const userId = req.user?.userId;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid User ID"
            });
        }

        console.log("Fetching stats for user:", userId);

        const stats = await PartTimeJob.aggregate([
            { $match: { "contact.postedBy": new mongoose.Types.ObjectId(userId) } },
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        let monthlyStats = await PartTimeJob.aggregate([
            { $match: { "contact.postedBy": new mongoose.Types.ObjectId(userId) } },
            {
                $addFields: {
                    createdAt: {
                        $cond: { if: { $ifNull: ["$createdAt", false] }, then: "$createdAt", else: new Date() }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": -1, "_id.month": -1 } }
        ]);

        console.log("Final Stats:", stats);
        console.log("Final Monthly Stats:", JSON.stringify(monthlyStats, null, 2));

        res.status(200).json({
            success: true,
            stats,
            monthlyStats
        });
    } catch (error) {
        console.error("Error fetching job stats:", error);
        res.status(500).json({
            success: false,
            message: "Unable to get stats",
            error: error.message
        });
    }
};



export const deleteJobController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const job = await PartTimeJob.findById(id);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        // Check if the logged-in user is the owner of the job
        if (req.user.userId !== job.contact.postedBy.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this job",
            });
        }

        await PartTimeJob.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Job deleted successfully",
        });

    } catch (error) {
        next(error);
    }
};

export const getMyJobsController = async (req, res) => {
    try {
        const userId = req.user?.userId;  // Get logged-in user ID

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid User ID"
            });
        }

        const jobs = await PartTimeJob.find({ "contact.postedBy": userId }); // Fetch all jobs posted by this user

        if (!jobs.length) {
            return res.status(404).json({
                success: false,
                message: "No jobs found"
            });
        }

        res.status(200).json({
            success: true,
            jobs
        });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({
            success: false,
            message: "Unable to get jobs",
            error: error.message
        });
    }
};

