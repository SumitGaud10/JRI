import type { RequestHandler } from "express";

export const NotFound: RequestHandler = (req, res) => {
  if (req.accepts("html")) {
    return res.status(404).render("404");
  }
  res.status(404).json({ error: "Not Found" });
};
