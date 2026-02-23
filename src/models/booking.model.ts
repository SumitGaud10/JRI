import mongoose, { type InferSchemaType } from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    enum: ["Railway", "Committe", "Others"],
    required: true,
  },
  bookedBy: {
    type: String,
    required: true,
  },
  entities: [
    {
      _id: {
        type: mongoose.Types.ObjectId,
        ref: "Entity",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

export type IBooking = InferSchemaType<typeof bookingSchema>;

export const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
