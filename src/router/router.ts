import { Router } from "express";
import { userLogin } from "../controllers/user.controller.js";
import { isAuth } from "../middleware/isAuth.js";
import {
  book,
  homePage,
  selectPage,
  view,
} from "../controllers/booking.controller.js";
import { loginMiddleware } from "../middleware/loginValidation.js";

const router = Router();

router.get("/", (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/booking/new");
  return res.redirect("/login");
});
router.get("/booking/new", isAuth, homePage);
router.post("/booking/select", isAuth, selectPage);
router.post("/booking/book", isAuth, book);
router.get("/booking/view", isAuth, view);

router.get("/login", (req, res) => res.render("login"));
router.post("/login", loginMiddleware, userLogin);

export default router;
