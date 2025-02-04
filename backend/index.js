import express from 'express';
import cors from 'cors';


import  dbConnection  from './database/dbConnection.js';
import User from './model/User.js'
import authRoute from "./routes/authRoute.js";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import userRoute from './routes/userRoute.js'
import jobsRoute from './routes/jobsRoute.js';
import errorMiddleware from './middelwares/errorMiddelwear.js';
import bcrypt from 'bcryptjs';
import helmet from 'helmet';
import xssClean from 'xss-clean';

import userAuth from './middelwares/authMiddelware.js';
dotenv.config();



const app = express();

app.use(helmet());
app.use(xssClean());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET_KEY || "frffdhhgffddsfghhjjkkjiuytrewsgghhjjhbbg-lmk0olk0okjhhyt";

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));



app.get('/test', (req, res) => {
    res.json("test ok");
});

app.use('/api/v1/auth',authRoute);
app.use('/api/v1/user',userAuth,userRoute)
app.use('/api/v1/jobs',jobsRoute)
app.use(errorMiddleware);





// app.get('/profile', (req, res) => {
//     const token = req.cookies.token;
//     if (token) {
//         jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//             if (err) {
//                 return res.status(401).json({ error: 'Token verification failed' });
//             }
//             try {
//                 const userDoc = await User.findById(userData.id);
//                 if (userDoc) {
//                     const { firstName, email, _id } = userDoc;
//                     res.json({ firstName, email, _id });
//                 } else {
//                     res.status(404).json({ error: 'User not found' });
//                 }
//             } catch (err) {
//                 res.status(500).json({ error: 'Internal server error' });
//             }
//         });
//     } else {
//         res.status(401).json({ error: 'No token provided' });
//     }
// });

app.get('/profile', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                return res.status(401).json({ error: 'Token verification failed' });
            }
            try {
                const userDoc = await User.findById(userData.id);
                if (userDoc) {
                    const { firstName, lastName, email, phoneNumber, _id } = userDoc;
                    res.json({ firstName, lastName, email, phoneNumber, _id });
                } else {
                    res.status(404).json({ error: 'User not found' });
                }
            } catch (err) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    } else {
        res.status(401).json({ error: 'No token provided' });
    }
});

await dbConnection();
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});