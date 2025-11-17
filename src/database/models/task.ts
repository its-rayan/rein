import mongoose, { Schema, Types } from "mongoose";

export interface ITask {
  _id: Types.ObjectId;
  goalId?: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  completed: boolean;
}

const taskSchema = new Schema<ITask>({
  goalId: { type: Schema.Types.ObjectId, ref: "Goal" },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false }
});

const Task =
  mongoose.models.Task<ITask> || mongoose.model<ITask>("Task", taskSchema);

export default Task;
