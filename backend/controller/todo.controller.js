import TodoModel from "../model/todo.model.js"

export const createTodo = async (req, res) => {
    const todo = new TodoModel({
        text: req.body.text,
        isComplete: false,
        user: req.user
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json({ message: "Todo created successfully", newTodo});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in todo creation", newTodo});
    }
};

export const getTodoList = async (req, res) => {
    try {
        const userId = req.user;
        const todoList = await TodoModel.find({user: userId});
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