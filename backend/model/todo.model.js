import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    }
});

const todo = mongoose.model(`todo`, todoSchema);
export default todo;