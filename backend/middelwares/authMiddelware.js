import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is not defined in environment variables");
}




const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: No token provided",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify the token
        req.user = { userId: payload.userId }; // Attach the user ID to the request object
        next(); // Proceed to the next middleware/controller
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid token",
        });
    }
};


export default userAuth;




  