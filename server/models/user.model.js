import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    uid: { type: String },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    photoURL: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model("User", userSchema)