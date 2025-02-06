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
        const jobs = await PartTimeJob.find({ postedBy: req.user.userId });
        res.status(200).send({
            success: true,
            totalJobs: jobs.length,
            jobs
        });
    } catch (error) {
        next(error);
    }
};

export const updateJobController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { jobTitle, description, location, salary, shiftTimings, contact } = req.body;

        if (!jobTitle || !location || !salary || !shiftTimings || !contact || !description) {
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            });
        }

        const job = await PartTimeJob.findById(id);
        if (!job) {
            return next(new Error("Job not found"));
        }

        if (req.user.userId !== job.postedBy.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this job"
            });
        }

        const updatedJob = await PartTimeJob.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).send({
            success: true,
            updatedJob
        });

    } catch (error) {
        next(error);
    }
};

export const deleteJobController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const job = await PartTimeJob.findById(id);
        if (!job) {
            return next(new Error("Job not found"));
        }

        if (req.user.userId !== job.postedBy.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this job"
            });
        }

        await job.deleteOne();
        res.status(200).send({
            success: true,
            message: "Success, job is deleted"
        });

    } catch (error) {
        next(error);
    }
};

export const jobStatsController = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const stats = await PartTimeJob.aggregate([
            {
                $match: { postedBy: new mongoose.Types.ObjectId(userId) }
            },
            {
                $group: { _id: "$status", count: { $sum: 1 } }
            }
        ]) || [];

        let monthlyStats = await PartTimeJob.aggregate([
            {
                $match: { postedBy: new mongoose.Types.ObjectId(userId) }
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
        ]) || [];

        monthlyStats = monthlyStats.map(item => {
            const {
                _id: { month, year },
                count
            } = item;
            const date = moment().month(month - 1).year(year).format("MMM YYYY");
            return { date, count };
        }).reverse();

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
