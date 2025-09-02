import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  title: String,
  url: String,
});

const userSchema = new mongoose.Schema({
  fullname: { type: String },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  links: [linkSchema],
});

export default mongoose.models.User || mongoose.model("User", userSchema);
