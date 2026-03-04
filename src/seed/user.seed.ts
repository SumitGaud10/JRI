import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import config from "../config/config.js";

async function seed() {
  await mongoose.connect(config.mongoUri);

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.create({
    username: "admin",
    password: hashedPassword,
    role: "admin",
  });

  console.log("Admin user created");

  process.exit();
}

seed();
