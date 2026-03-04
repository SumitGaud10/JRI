import { Router } from "express";
import {
  loginPage,
  passwordChanger,
  userLogin,
  userLogout,
} from "../controllers/auth.controller.js";
import { isAuth } from "../middleware/isAuth.js";
import { loginMiddleware } from "../middleware/loginValidation.js";

const router = Router();

router.get("/", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  if (req.user.role == "user") {
    return res.redirect("/booking/new");
  } else {
    return res.redirect("/admin");
  }
});

router.get("/login", loginPage);
router.post("/login", loginMiddleware, userLogin);
router.post("/logout", isAuth, userLogout);
router.post("/passwd", isAuth, passwordChanger);

export default router;
