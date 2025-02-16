import { Todo } from "../models/Todo.models.js";

export const addTodo = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.json({ message: "Title is required" });
    }

    const todo = Todo({
      title,
    });
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.log(error);
    res.json({
      message: "Server Error",
    });
  }
};

export const getAllTodos = async (req, res) => {
  const todos = await Todo.find();
  console.log(todos);
  res.json(todos);
};

export const deleteTodoById = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted!" });
};

export const deleteAllTodos = async (req, res) => {
  await Todo.deleteMany();
  res.json({ message: "All Todos deleted!" });
};

export const markTodoCompletedById = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.isCompleted = !todo.isCompleted;
  await todo.save();
  res.json(todo);
};

export const updateTodoById = async (req, res) => {
  try {
    const { title, isCompleted } = req.body;

    if (!title) {
      return res.json({ message: "Title required" });
    }
    console.log(isCompleted);
    if (isCompleted == null || isCompleted == undefined) {
      return res.json({ message: "isCompleted required" });
    }

    const todo = await Todo.findById(req.params.id);
    todo.isCompleted = isCompleted;
    todo.title = title;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.json({ message: "Server error" });
  }
};
