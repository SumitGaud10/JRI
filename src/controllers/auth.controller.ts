import passport from "passport";
import { asyncHandler } from "../utils/asyncHandler.js";

export const userLogin = asyncHandler(
  passport.authenticate("local", {
    successRedirect: "/booking/new",
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
