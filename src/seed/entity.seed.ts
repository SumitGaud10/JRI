import mongoose from "mongoose";
import config from "../config/config.js";
import { Entity } from "../models/entity.model.js";

async function seed() {
  await mongoose.connect(config.mongoUri);

  await Entity.create({
    name: "Room 1",
    price: {
      Railway: 2000,
      Committee: 3000,
      Others: 4000,
    },
  });

  console.log("Created Entity");
  process.exit();
}

seed();
