import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from  "./routes/message.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";


const app = express();

const PORT = process.env.PORT || 5000;
config();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);




// app.get("/", (req, res) => {
//   //root route https://localhost:5000/
//   res.send({ message: "Hello World" });
// });


app.listen(5000, () => {
  connectToMongoDB();
  console.log("Server Running on port 5000");
});
