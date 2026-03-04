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
