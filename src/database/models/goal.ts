import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String },
  deadline: { type: Date, required: true },
  status: {
    type: String,
    enum: ["not_started", "in_progress", "completed", "abandoned"],
    default: "not_started"
  },
  progress: { type: Number, default: 0 }
});

const Goal = mongoose.models.Goal || mongoose.model("Goal", goalSchema);

export default Goal;
