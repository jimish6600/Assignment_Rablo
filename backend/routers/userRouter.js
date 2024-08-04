import express from "express";
import { userLogin } from "../controllers/user/userLogin.js";
import { UserRegister } from "../controllers/user/userRegister.js";
import authToken from "../middleware/authToken.js";
import userDetails from "../controllers/user/userDetails.js";

const userRouter = express.Router();

userRouter.post("/register", UserRegister);
userRouter.post("/login", userLogin);
userRouter.get("/userDetails",authToken,userDetails)

export default userRouter;