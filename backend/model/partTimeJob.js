import mongoose from "mongoose";

const  partTimeJobSchema = new mongoose.Schema({
    
        jobTitle :{
            type:String,
            required :[true,"jobTitle is required"]

        },
        description: {
            type: String,
            required: [true, "Job description is required"],
            trim: true,
        },
    location: {
        address: { type: String, required: true }, // Full address
        city: { type: String },
        state: { type: String },
        country: { type: String },
        zipCode: { type: String },
        coordinates: {
            type: { type: String, default: "Point" },
            coordinates: { type: [Number], default: [0, 0] } // [longitude, latitude]
        }

    },
    salary: {
        type: Number,
        required: [true, "Salary is required"],
    },
    status:{
        type:String,
        enum:['pending', 'reject','Accept'],
        default:'pending'
    },
    shiftTimings: [{
        startTime: { type: Date },
        endTime: { type: Date }
    }],
        contact: {
            name: { type: String, required: true },
            email: { type: String, required: true, validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: (props) => `${props.value} is not a valid email address!`,
            }},
            phone: { type: String, required: true, validate: {
                validator: function (v) {
                    return /^\+?[1-9]\d{1,14}$/.test(v); // E.164 format validation
                },
                message: (props) => `${props.value} is not a valid phone number!`,
            }}
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
           
        },


        createdAt: {
            type: Date,
            default: Date.now,
          },

    }
    


);
const PartTimeJob = mongoose.model("Job", partTimeJobSchema);

export default PartTimeJob;