import mongoose from "mongoose";
import User from "./User.js"

const partTimeJobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: [true, "Job title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Job description is required"],
        trim: true
    },
    location: {
        address: { 
            type: String, 
            required: [true, "Location address is required"],
            trim: true
        },
        city: {
            type: String,
            required: [true, "City is required"],
            trim: true
        },
        state: {
            type: String,
            required: [true, "State is required"],
            trim: true
        },
        zipcode: {
            type: String,
            required: [true, "Zipcode is required"],
            trim: true
        }
    },
    salary: {
        type: Number,
        required: [true, "Salary is required"]
    },
    status: {
        type: String,
        enum: ["pending", "rejected", "accepted"],
        default: "pending"
    },
    details: {
        name: {
            type: String,
            required: [true, "Contact name is required"],
            trim: true
        },
        phoneNumber: {
            type: String,
            required: [true, "Contact phone number is required"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Contact email is required"],
            trim: true
        }
    },
    contact: {
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    }
});

const PartTimeJob = mongoose.model("PartTimeJob", partTimeJobSchema);

export default PartTimeJob;
