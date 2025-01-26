import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, );
        console.log("mongo connected")
        
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

export default dbConnection;
