import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  role: "user" | "admin";
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User;
