import passport from "passport";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const userLogin = asyncHandler(
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: "Incorrect credentails",
  }),
);

export const userLogout = asyncHandler(async (req, res) => {
  req.logOut((err) => {
    if (err) {
      return res.render("500");
    }

    return res.redirect("/login");
  });
});

export const loginPage = asyncHandler(async (req, res) => res.render("login"));

export const passwordChanger = asyncHandler(async (req, res) => {
  const { _id } = req.user!;
  const { currentPassword, newPassword } = req.body;

  const user = await User.findOne({ _id });
  if (!user) {
    return res.render("404");
  }
  if (!(await bcrypt.compare(currentPassword, user.password))) {
    req.flash("error", "Current password is wrong");
    return res.redirect("/");
  }

  const newPasswordHashed = await bcrypt.hash(newPassword, 10);
  await user.updateOne({ password: newPasswordHashed });

  req.flash("success", "Password changed for currently logged in user");
  res.redirect("/");
});
