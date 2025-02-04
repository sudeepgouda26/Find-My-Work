import mongoose from "mongoose";
import PartTimeJob from "../model/partTimeJob.js";
import moment from "moment/moment.js";
export const jobController = async(req , res, next)=>{
    try {
        const {jobTitle, description,location, salary,shiftTimings, contact} =req.body;
        if (!jobTitle || !description || !location || !salary || !shiftTimings || !contact ) {
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            });
        }
        req.body.postedBy = req.user.userId;
        const job = await PartTimeJob.create(req.body);
        res.status(200).send({
            success:true,
            message:"jobs posted succesfully",
            job
        })

    } catch (error) {
        next();
    }
};

export const getjobsController =async(req, res, next)=>{
 
    try {
        const jobs = await PartTimeJob.find({postedBy:req.user.userId});
        res.status(200).send({
            success:true,
            totalJobs:jobs.length,
            jobs
        });
    } catch (error) {
        next(error);
    }


}



export const updateJobController = async(req,res,next)=>{
try {
    const {id }=req.params;
    const {jobTitle, description,location, salary,shiftTimings, contact}=req.body;
    if (!jobTitle || !location || !salary || !shiftTimings || !contact ) {
        return res.status(400).send({
            success: false,
            message: "All fields are required"
        });


    }
    const job = await PartTimeJob.findOne({_id:id});
    if(!job){
        next("job is not found");
    }
    if(!req.user.userId === job.postedBy.toString()){
        next(" You are not auotherized to update this ")
        return;
       
    };

    const updateJob = await PartTimeJob.findOneAndUpdate({_id:id}, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).send({
        success:true,
        updateJob
    })

} catch (error) {
    next("unable to update")
}
}

export const deleteJobController =async(req,res,next)=>{
    const {id}=req.params;

    const job = await PartTimeJob.findOne({_id:id});
    if(!job){
        next("job not found")
    }
    if(req.user.userId !== job.postedBy.toString()){
            next("you are not auotherized to delete this job");
            return;
    }
    await job.deleteOne();
    res.status(200).send({
        success:true,
        message:"success, job is deleted"
    })
}



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
                $match: {
                    postedBy: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);
      let    monthlyStats = await PartTimeJob.aggregate([
            {
                $match: {
                    postedBy: new mongoose.Types.ObjectId(userId),
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
            {
                $sort: { "_id.year": -1, "_id.month": -1 } // Sort by year and month
            }
        ]);
        monthlyStats = monthlyStats.map(item => {
            const {
                _id: { month, year },
                count
            } = item;
            const date = moment().month(month - 1).year(year).format("MMM YYYY");
            return { date, count };
        })
        .reverse();

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

