import mongoose, { type InferSchemaType } from "mongoose";

const entitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: {
      Railway: {
        type: Number,
        required: true,
      },
      Committee: {
        type: Number,
        required: true,
      },
      Others: {
        type: Number,
        required: true,
      },
    },
    required: true,
  },
});

export type IEntity = InferSchemaType<typeof entitySchema>;

export const Entity = mongoose.model<IEntity>("Entity", entitySchema);
