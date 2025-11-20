import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  image: string;
  emailVerified: Date | null;
  goals: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  image: { type: String },
  emailVerified: { type: Date },
  goals: [{ type: Types.ObjectId, ref: "Goal" }]
});

const User =
  mongoose.models.User<IUser> || mongoose.model<IUser>("User", userSchema);

export default User;
