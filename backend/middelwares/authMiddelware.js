import jwt from "jsonwebtoken";

const userAuth = async(req, res,next)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).send({
                success:false,
                message:"unauthorized"
            })
        }
        const token = authHeader.split(" ")[1];
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user ={userId:payload.userId};
           next();
          
            
        } catch (error) {
            console.error("Token verification failed:", error);
            res.status(401).send({
                success: false,
                message: "Invalid token"
            });
        }
    
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message:"unauthorized",
            success:false,
            error
        })
    }
   

}

export default userAuth;