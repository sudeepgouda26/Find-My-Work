import UserModel from "../model/User.js";

const updateUserController = async (req, res, next) => {
    try {
        const { email, firstName, lastName, phoneNumber } = req.body;
        if (!email || !firstName || !lastName || !phoneNumber) {
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            });
        }

        if (!req.user || !req.user.userId) {
            return res.status(400).send({
                success: false,
                message: "User ID is required"
            });
        }

        const user = await UserModel.findOne({ _id: req.user.userId });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;
        user.phoneNumber = phoneNumber;
        await user.save();

        const token = await user.createJwt();
        res.status(200).send({
            success: true,
            message: "User updated successfully",
            user,
            token
        });
    } catch (error) {
        next(error); // Pass the error to the error middleware
    }
}

export default updateUserController;