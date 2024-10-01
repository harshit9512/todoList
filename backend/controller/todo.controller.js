import TodoModel from "../model/todo.model.js"

export const createTodo = async (req, res) => {
    const todo = new TodoModel({
        text: req.body.text,
        isComplete: req.body.isComplete
    });

    try {
        const savedTodoModel = await todo.save();
        res.status(201).json({ message: "Todo created successfully", savedTodoModel});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in todo creation", savedTodoModel});
    }
};

export const getTodoList = async (req, res) => {
    try {
        const todoList = await TodoModel.find();
        res.status(201).json({ message: "Todo list fetched successfully", todoList});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in fetch todo list", todoList});
    }
};

export const updateTodo = async (req, res) => {
    try {
        const todoList = await TodoModel.findByIdAndUpdate(req.param.id, req.body, {
            new: true
        });
        res.status(201).json({ message: "Todo updated successfully", todoList});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in fetching todo list", todoList});
    }
};