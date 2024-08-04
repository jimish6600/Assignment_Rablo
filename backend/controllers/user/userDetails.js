import userModel from "../../models/userModel.js";

const userDetails = async (req, res) => {
    try {
        const id = req.userId
        const user = await userModel.findById(id);
        res.status(200).json({
            name : user.username,
            success: true,     
        });
    } catch (error) {
        res.status(error.status || 400).json({
            message: error.message || "An error occurred",
            success: false,
        });
    }
};

export default userDetails;