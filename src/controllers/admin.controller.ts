import mongoose from "mongoose";
import { Entity } from "../models/entity.model.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import z from "zod";
import config from "../config/config.js";

export const adminHomePage = asyncHandler(async (req, res) => {
  const userList = await User.find({ role: "user" });
  const entityList = await Entity.find();
  return res.render("admin/index", { userList, entityList });
});

export const getAUser = asyncHandler(async (req, res) => {
  const id = req.params.id as string;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).render("404");

  const user = await User.findById(id);
  if (!user) return res.status(404).render("404");

  return res.render("admin/user-detail", { information: user });
});

const newPasswordSchema = z
  .object({
    newPassword: z.string().min(8),
  })
  .strict();

export const changePassword = asyncHandler(async (req, res) => {
  const id = req.params.id as string;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).render("404");

  const parsed = await newPasswordSchema.safeParseAsync(req.body);
  if (!parsed.success) {
    req.flash("error", "Invalid New Password");
    return res.redirect(`/admin/user/${id}`);
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).render("404");
  }

  const newPasswordHashed = await bcrypt.hash(
    parsed.data.newPassword,
    config.salt,
  );

  user.password = newPasswordHashed;
  await user.save();

  req.flash("success", `Password for ${user.username} has been changed`);
  return res.redirect(`/admin/user/${user._id}`);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id as string;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).render("404");

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).render("404");
  }

  req.flash("success", `User ${user.username} has been deleted`);
  return res.redirect("/admin");
});

const userSchema = z
  .object({
    username: z.string().trim().min(1),
    password: z.string().min(8),
  })
  .strict();

export const createUser = asyncHandler(async (req, res) => {
  const parsed = await userSchema.safeParseAsync(req.body);
  if (!parsed.success) {
    req.flash("error", "Invalid Input");
    return res.redirect("/admin");
  }

  const HashedPassword = await bcrypt.hash(parsed.data.password, config.salt);
  const newUser = new User({
    username: parsed.data.username,
    password: HashedPassword,
    role: "user",
  });

  await newUser.save();

  req.flash("success", `User ${newUser.username} has been created`);
  return res.redirect("/admin");
});

const entitySchema = z
  .object({
    name: z.string().min(1),
    Railway: z.coerce.number().min(0),
    Committee: z.coerce.number().min(0),
    Others: z.coerce.number().min(0),
  })
  .strict()
  .transform((data) => ({
    name: data.name,
    price: {
      Railway: data.Railway,
      Committee: data.Committee,
      Others: data.Others,
    },
  }));

export const createEntity = asyncHandler(async (req, res) => {
  const parsed = await entitySchema.safeParseAsync(req.body);
  if (!parsed.success) {
    req.flash("error", "Invalid Input");
    return res.redirect("/admin");
  }

  const newEntity = new Entity(parsed.data);
  await newEntity.save();

  req.flash("success", `Entity ${newEntity.name} has been created`);
  return res.redirect("/admin");
});

export const getAnEntity = asyncHandler(async (req, res) => {
  const id = req.params.id as string;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).render("404");

  const entity = await Entity.findById(id);
  if (!entity) return res.status(404).render("404");

  return res.render("admin/entity-detail", { information: entity });
});

export const deleteEntity = asyncHandler(async (req, res) => {
  const id = req.params.id as string;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).render("404");

  const entity = await Entity.findByIdAndDelete(id);

  if (!entity) return res.status(404).render("404");

  req.flash("success", `Entity ${entity.name} has been deleted`);
  return res.redirect("/admin");
});

export const entityPriceSchema = z
  .object({
    Railway: z.coerce.number().min(0),
    Committee: z.coerce.number().min(0),
    Others: z.coerce.number().min(0),
  })
  .strict();

export const editEntity = asyncHandler(async (req, res) => {
  const id = req.params.id as string;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).render("404");

  const parsed = await entityPriceSchema.safeParseAsync(req.body);
  if (!parsed.success) {
    req.flash("error", "Invalid price input");
    return res.redirect(`/admin/entity/${id}`);
  }

  const entity = await Entity.findById(id);
  if (!entity) return res.status(404).render("404");

  entity.price = parsed.data;
  await entity.save();

  req.flash("success", `Entity ${entity.name} has been updated`);
  return res.redirect(`/admin/entity/${entity._id}`);
});
