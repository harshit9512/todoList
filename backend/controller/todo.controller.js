import TodoModel from "../model/todo.model.js"

export const createTodo = async (req, res) => {
    const todo = new TodoModel({
        text: req.body.text,
        isComplete: req.body.isComplete
    });

    try {
        const savedTodoModel = await todo.save();
        res.status(201).json({ message: "TODO created successfully", savedTodoModel});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in TODO creation", savedTodoModel});
    }
};