import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoute from "./routes/todo.route.js";

const app = express();
dotenv.config();

// port
const port = process.env.PORT || 4002;
app.listen(port, () => {
    console.log(`server up on ${port}`);
});

// database connection
const DB_URI = process.env.MONGODB_URI;
try {
  mongoose.connect(DB_URI);
  console.log(`Connected to MongoDB`);
} catch (error) {
  console.log(error);
}

// routes
app.use(express.json());
app.use("/todo", todoRoute);

app.get(`/`,(req,res) => {
    res.send(`TODO App`);
})
