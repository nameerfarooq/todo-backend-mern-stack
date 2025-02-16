import mongoose from "mongoose";
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

export const Todo = mongoose.model("Todo", TodoSchema);
