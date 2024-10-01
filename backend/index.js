import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";

const app = express();
dotenv.config();

const port = process.env.PORT || 4002;
const DB_URI = process.env.MONGODB_URI;
app.listen(port, () => {console.log(`server up on ${port}`)}) 

//database connection
try {
    mongoose.connect(DB_URI);
    console.log(`Connected to MongoDB`)
} catch (error) {
    
}

app.get(`/`,(req,res) => {
    res.send(`Hello World!`)
})