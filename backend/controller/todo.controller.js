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
        res.status(200).json({ message: "Todo list fetched successfully", todoList});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in fetch todo list", todoList});
    }
};

export const updateTodo = async (req, res) => {
    try {
        const todo = await TodoModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.status(200).json({ message: "Todo updated successfully", todo});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in fetching todo list", todo});
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const todo = await TodoModel.findByIdAndDelete(req.params.id);
        if(!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo updated successfully", todo});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in fetching todo list", todo});
    }
};