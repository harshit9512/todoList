import express from "express";
import { createTodo } from "../controller/todo.controller.js";
import { getTodoList } from "../controller/todo.controller.js";
import { updateTodo } from "../controller/todo.controller.js";
import { deleteTodo } from "../controller/todo.controller.js";

const router = express.Router();

router.post("/create", createTodo);
router.get("/fetch", getTodoList);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
