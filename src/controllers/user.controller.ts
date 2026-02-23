import passport from "passport";
import { asyncHandler } from "../utils/asyncHandler.js";

export const userLogin = asyncHandler(
  passport.authenticate("local", {
    successRedirect: "/booking/new",
    failureRedirect: "/login",
    failureFlash: "Incorrect credentails",
  }),
);
