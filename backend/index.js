import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import  dbConnection  from './database/dbConnection.js';
import User from './model/User.js'
import cookieParser from 'cookie-parser';



const app = express();
app.use(express.json());
app.use(cookieParser());
const bcryptSalt =bcrypt.genSaltSync(10) ;
const jwtSecret = "frffdhhgffddsfghhjjkkjiuytrewsgghhjjhbbg-lmk0olk0okjhhyt";

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

dbConnection();

app.get('/test', (req, res) => {
    res.json("test ok");
});

app.post('/register', async (req, res) => {
    const { firstName,LastName, email, phoneNumber, password } = req.body;

    try{
        const userDoc= await User.create({
            firstName,
            LastName,
            email,
            phoneNumber,
            password:bcrypt.hashSync(password,bcryptSalt)
           });
           res.json(userDoc);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax' }).json(userDoc);
            });
        } else {
            res.status(422).json("pass not ok");
        }
    } else {
        res.json("not found");
    }
});

// app.get('/profile',(req,res)=>{
//     const {token}= req.cookies;
//     res.json(token);
// })

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});