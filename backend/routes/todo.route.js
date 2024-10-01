import express from "express";
import {createTodo} from "../controller/todo.controller.js"

const router = express.Router();

router.post("/create", createTodo);

export default router;