export const errorMiddleware = (err: any, req: any, res: any, next: any) => {
  console.error(err);

  res.status(500);

  if (req.accepts("html")) {
    return res.render("500", {
      message: "Something went wrong.",
    });
  }

  res.json({ error: "Internal Server Error" });
};
