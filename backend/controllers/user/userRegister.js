import bcrypt from "bcryptjs";
import userModel from "../../models/userModel.js";

export const UserRegister = async (req, res) => {
    try {
        console.log("Register")
        const { username, password } = req.body;
        
        const tUsername = username.trim();
        if (!tUsername || !password) {
            throw { message: "Username and password are required", status: 404 };
        }
    
        if (password.length < 6) {
            throw { message: "Password must be at least 6 characters", status: 400 };
        }

        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            throw { message: "The username is already taken. Please choose a different one.", status: 400 };
        }
        console.log("done")
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if (!hashPassword) {
        throw { message: "Creating hash using password error found.", status: 404 };
        }
        
        const newUser = await userModel.create({
            username : username,
            password : hashPassword,
        });

        console.log("done")

        res.status(200).json({
            message : "User Register",
            success: true,     
        });
    } catch (error) {
        res.status(error.status || 400).json({
            message: error.message || "An error occurred",
            success: false,
        });
    }
  };