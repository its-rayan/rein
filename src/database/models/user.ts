import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  image: { type: String },
  emailVerified: { type: Date }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
