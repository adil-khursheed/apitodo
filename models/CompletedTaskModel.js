import mongoose from "mongoose";

const completedTaskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  _id: {
    type: String,
  },
  title: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const CompletedTask = mongoose.model(
  "CompletedTask",
  completedTaskSchema
);
