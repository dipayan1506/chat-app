import express from "express";
import { config } from 'dotenv';
import authRoutes from  './routes/auth.routes.js';
config();

const app = express();

const PORT=process.env.PORT || 5000;

app.get("/",(req,res)=>{
    //root route https://localhost:5000/
    res.send({message:"Hello World"});
});


app.use("/api/auth",authRoutes);





app.listen(5000, () => console.log("Server Running on port 5000"));
