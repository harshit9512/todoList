import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    isComplete: {
        type: Boolean,
        required: true
    }
});

const TodoModel = mongoose.model(`todo`, todoSchema);
export default TodoModel;