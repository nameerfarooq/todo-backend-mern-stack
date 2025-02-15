const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
//mongodb connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

// api for creating todos

app.post("/todo", async (req, res) => {
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
});

// api for getting todos

app.get("/todo", async (req, res) => {
  const todos = await Todo.find();
  console.log(todos);
  res.json(todos);
});

app.delete("/todo/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted!" });
});
app.delete("/todo", async (req, res) => {
  await Todo.deleteMany();
  res.json({ message: "All Todos deleted!" });
});

app.patch("/todo/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.isCompleted = !todo.isCompleted;
  await todo.save();
  res.json(todo);
});

app.put("/todo/:id", async (req, res) => {
  try {
    const { title, isCompleted } = req.body;

    if (!title) {
      return res.json({ message: "Title required" });
    }
    if (!isCompleted) {
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
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("APP is running on : ", PORT);
});
