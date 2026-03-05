import { Entity } from "../models/entity.model.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";

export const adminHomePage = asyncHandler(async (req, res) => {
  const userList = await User.find({ role: "user" });
  const entityList = await Entity.find();
  res.render("admin/index", { userList, entityList });
});

export const getAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  res.render("admin/user-detail", { information: user });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;
  const user = await User.findOne({ _id: id });
  const newPasswordHashed = await bcrypt.hash(newPassword, 10);
  await user?.updateOne({ password: newPasswordHashed });
  req.flash("success", `Password for ${user?.username} has been changed`);
  return res.redirect(`/admin/user/${user?._id}`);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findOneAndDelete({ _id: id });
  req.flash("success", `User ${user?.username} has been deleted`);
  return res.redirect("/admin");
});

export const createUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const HashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    password: HashedPassword,
    role: "user",
  });

  req.flash("success", `User ${newUser.username} has been created`);
  return res.redirect("/admin");
});

export const createEntity = asyncHandler(async (req, res) => {
  const { name, Railway, Committee, Others } = req.body;
  const newEntity = await Entity.create({
    name,
    price: {
      Railway,
      Committee,
      Others,
    },
  });
  req.flash("success", `Entity ${newEntity.name} has been created`);
  return res.redirect("/admin");
});

export const getAnEntity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const entity = await Entity.findOne({ _id: id });
  return res.render("admin/entity-detail", { information: entity });
});

export const deleteEntity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const entity = await Entity.findOneAndDelete({ _id: id });
  req.flash("success", `Entity ${entity?.name} has been deleted`);
  return res.redirect("/admin");
});

export const editEntity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const prices = req.body;
  const entity = await Entity.findOne({ _id: id });
  await entity?.updateOne({ price: prices });
  req.flash("success", `Entity ${entity?.name} has been updated`);
  return res.redirect(`/admin/entity/${entity?._id}`);
});
