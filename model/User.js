import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    handle: {
      type: String,
      unique: true,
      sparse: true,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    provider: {
      type: String,
      enum: ["credentials", "github", "google"],
      default: "credentials",
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || model("User", userSchema);
export default User;
