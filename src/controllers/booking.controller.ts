import {
  createBooking,
  getAllBookings,
  getAvailableEntity,
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
    console.log(data.error);
    req.flash("error", "Invalid Input");
    return res.redirect("/booking/new");
  }

  await createBooking(data.data, req.user!);

  req.flash("success", "Booking created");
  return res.redirect("/booking/new");
});

export const view = asyncHandler(async (req, res) => {
  const response = await getAllBookings();
  return res.render("dashboard/view", { response });
});
