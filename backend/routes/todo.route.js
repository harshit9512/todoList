import express from "express";
import { createTodo } from "../controller/todo.controller.js";
import { getTodoList } from "../controller/todo.controller.js";
import { updateTodo } from "../controller/todo.controller.js";
import { deleteTodo } from "../controller/todo.controller.js";
import { verifyToken } from "../jwt/token.js";

const router = express.Router();

router.post("/create", verifyToken, createTodo);
router.get("/fetch", verifyToken, getTodoList);
router.put("/update/:id", verifyToken, updateTodo);
router.delete("/delete/:id", verifyToken, deleteTodo);

export default router;
