import express from "express";
import {
  addTodo,
  getAllTodos,
  deleteTodoById,
  deleteAllTodos,
  markTodoCompletedById,
  updateTodoById,
} from "../controllers/index.js";

const router = express.Router();

router.post("/todo", addTodo);
router.get("/todo", getAllTodos);
router.delete("/todo/:id", deleteTodoById);
router.delete("/todo", deleteAllTodos);
router.patch("/todo/:id", markTodoCompletedById);
router.put("/todo/:id", updateTodoById);

export default router;
