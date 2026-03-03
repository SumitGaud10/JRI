import mongoose from "mongoose";
import {
  createBooking,
  deleteBookingService,
  getAllBookings,
  getAvailableEntity,
  getBooking,
} from "../services/booking.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createFormBody, selectBody } from "../zod/booking.zod.js";

export const homePage = asyncHandler(async (req, res) => {
  const user = req.user;
  const today = new Date().toLocaleDateString("en-CA");
  res.render("dashboard/new", { user, today });
});

export const selectPage = asyncHandler(async (req, res) => {
  const data = await selectBody.safeParseAsync(req.body);
  if (!data.success) {
    req.flash("error", "Invalid Input");
    return res.redirect("/booking/new");
  }
  const availableEntities = await getAvailableEntity(data.data);
  return res.render("dashboard/select", { data: data.data, availableEntities });
});

export const book = asyncHandler(async (req, res) => {
  const data = await createFormBody.safeParseAsync(req.body);

  if (!data.success) {
    req.flash("error", "Invalid Input");
    return res.redirect("/booking/new");
  }

  await createBooking(data.data, req.user!);

  req.flash("success", "Booking created");
  return res.redirect("/booking/new");
});

export const view = asyncHandler(async (req, res) => {
  const query = req.query;
  const response = await getAllBookings(query);
  return res.render("dashboard/view", { response });
});

export const detailedView = asyncHandler(async (req, res) => {
  const query = req.params.id as string;
  if (!mongoose.Types.ObjectId.isValid(query)) {
    return res.render("404");
  }
  const booking = await getBooking(query);
  if (!booking) {
    req.flash("error", "Booking not found");
    return res.redirect("/booking/view");
  }
  res.render("dashboard/details", { booking });
});

export const deleteBooking = asyncHandler(async (req, res) => {
  const query = req.params.id as string;
  if (!mongoose.Types.ObjectId.isValid(query)) {
    req.flash("error", "Parameter not valid");
    return res.redirect(`/booking/view/${query}`);
  }

  const success = await deleteBookingService(query);
  if (!success) {
    req.flash("error", "Could not delete booking");
    return res.redirect(`/booking/view/${req.query}`);
  }

  req.flash("success", "Booking deleted successfully");
  return res.redirect("/booking/view");
});
