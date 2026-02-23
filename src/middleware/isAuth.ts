import type { RequestHandler } from "express";

export const isAuth: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect("/login");
};
