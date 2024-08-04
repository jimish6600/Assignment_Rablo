import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/db.js";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRoute.js";

const app = express();
app.use(cors({
  origin : process.env.FRONTEND_URL,
  credentials : true
}))
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Jimish's backend project connected");
});
app.use("/api/auth", userRouter);
app.use("/api/products", productRouter)

const PORT = process.env.PORT || 8080 

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("DB connect")
        console.log(`Server is runing${PORT}`)
    })
})