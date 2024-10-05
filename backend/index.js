import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoute from "./routes/todo.route.js";
import userRoute from "./routes/user.route.js";
import cors from "cors";

const app = express();
dotenv.config();

// port
const port = process.env.PORT || 4002;
app.listen(port, () => {
    console.log(`server up on ${port}`);
});

// database connection
const DB_URI = process.env.MONGODB_URI || "mongodb+srv://harshit:9512007h*H@cluster0.3s1ed.mongodb.net/todo_app";
try {
  await mongoose.connect(DB_URI);
  console.log(`Connected to MongoDB`);
} catch (error) {
  console.log(error);
}

app.use(cors({
  origin: "*",// check tutorial @2:38 // fetch from .env file
  // credentials: true, // enable cookies
  methods: ["GET", "POST", "PUT", "DELETE"]
  // allowedHeaders: ["Content-Type", "Authorization"] //  allowed headers
}));
app.use(express.json());
// routes
app.use("/todo", todoRoute);
app.use("/user", userRoute);

app.get(`/`,(req,res) => {
    res.send(`TODO App`);
})
