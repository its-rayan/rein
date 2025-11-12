import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date },
  status: {
    type: String,
    enum: ["not_started", "in_progress", "completed", "abandoned"],
    default: "not_started"
  },
  progress: { type: Number }
});

const Goal = mongoose.models.Goal || mongoose.model("Goal", goalSchema);

export default Goal;
