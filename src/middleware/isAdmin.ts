import type { RequestHandler } from "express";

export const isAdmin: RequestHandler = (req, res, next) => {
  if (req.user?.role == "admin") {
    next();
  } else {
    res.redirect("/booking/new");
  }
};
