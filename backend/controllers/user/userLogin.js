import userModel from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
    try {
        console.log("Login attempt");
        const { username, password } = req.body;

        if (!username || !password) {
            throw { message: "Username and password are required", status: 400 };
        }

        const user = await userModel.findOne({ username }).select("+password");
        if (!user) {
            throw { message: "Invalid username", status: 404 };
        }
        console.log("Login 2");
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            throw { message: "Invalid username or password", status: 401 };
        }

        const tokenData = {
          _id: user._id,
        };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY);

        res.status(200).json({
            data: token,
            name : username,
            success: true,     
        });
    } catch (error) {
        res.status(error.status || 400).json({
            message: error.message || "An error occurred",
            success: false,
        });
    }
};
