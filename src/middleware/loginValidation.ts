import type { RequestHandler } from "express";
import { userSchema } from "../zod/user.zod.js";

export const loginMiddleware: RequestHandler = async (req, res, next) => {
  const formBody = req.body;
  if (!(await userSchema.safeParseAsync(formBody)).success) {
    req.flash("warning", "Invalid Input");
    return res.redirect("/login");
  }
  next();
};
