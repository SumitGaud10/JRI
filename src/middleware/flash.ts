import type { RequestHandler } from "express";

export const flashMiddlware: RequestHandler = (req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.warning = req.flash("warning");
  res.locals.location = req.path;
  res.locals.query = req.query;
  res.locals.user = req.user;
  next();
};
