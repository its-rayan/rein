import mongoose, { Schema, Types } from "mongoose";

export interface IGoal {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  name: string;
  description: string;
  deadline: Date;
  status: "not_started" | "in_progress" | "completed" | "abandoned";
  progress: number;
  tasks: Types.ObjectId[];
}

const goalSchema = new Schema<IGoal>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String },
  deadline: { type: Date, required: true },
  status: {
    type: String,
    enum: ["not_started", "in_progress", "completed", "abandoned"],
    default: "not_started"
  },
  progress: { type: Number, default: 0 },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }]
});

const Goal =
  mongoose.models.Goal<IGoal> || mongoose.model<IGoal>("Goal", goalSchema);

export default Goal;
