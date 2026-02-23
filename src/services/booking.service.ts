import { Booking } from "../models/booking.model.js";
import { Entity } from "../models/entity.model.js";
import type { createFormBody, selectBody } from "../zod/booking.zod.js";

export const getAvailableEntity = async (data: selectBody) => {
  const existingBooking = await Booking.find({ date: data.date });
  const bookedIds = existingBooking
    .flatMap((b) => b.entities)
    .map((e) => e._id)
    .filter((id) => !!id);
  const availableEntities = await Entity.find({
    _id: { $nin: bookedIds },
  });

  return availableEntities;
};

export const createBooking = async (
  data: createFormBody,
  user: Express.User,
) => {
  const EntityList = await Entity.find({ _id: { $in: data.entities } });
  const result = EntityList.map((entity) => ({
    _id: entity._id,
    name: entity.name,
    price: entity.price?.[data.occupation] ?? 0,
  }));

  await Booking.create({
    name: data.name,
    date: data.date,
    occupation: data.occupation,
    entities: result,
    bookedBy: user.username,
  });
};

export const getAllBookings = async () => {
  return await Booking.find();
};
