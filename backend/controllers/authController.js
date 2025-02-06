import User from "../model/User.js";
import bcrypt from 'bcryptjs';

export const registerController=async(req,res)=>{
try {
    const{email,phoneNumber,firstName,lastName,password}=req.body;
    if(!email || !firstName || !phoneNumber || !password){
        return res.status(400).send({
            success:false,
            message:"all fields are required"
        });
    };
   
    
    const existingUser =await User.findOne({email});
    if (existingUser) {
        return res.status(400).send({
            success:false,
            message:"email already registered"
        });
        
    };
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDoc= await User.create({
        email,
        phoneNumber,
        firstName,
        lastName,
        password
    });
    const token =userDoc.createJwt();
    res.status(200).send({
        success:true,
        message:"registartion successful",
        userDoc:{
          email:userDoc.email,
            phoneNumber:userDoc.phoneNumber,
            firstName:userDoc.firstName,

            lastName:userDoc.lastName,
        },
        token
    })
    
} catch (error) {
    console.log(error);
    res.status(400).send({
        message:"error in registration",
        success:false,
        error
    });
};

};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please provide all fields"
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Invalid credentials"
            });
        }
        const token = user.createJwt();
        res.status(200).json({
            success: true,
            message: "Login successfully",
            user: {
                email: user.email,
                phoneNumber: user.phoneNumber,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error in login",
            success: false,
            error
        });
    }
};

export const logoutController = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Logged out successfully. Please remove the token on the frontend.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Logout failed",
            error: error.message
        });
    }
};
