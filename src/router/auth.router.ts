import { Router } from "express";
import {
  loginPage,
  userLogin,
  userLogout,
} from "../controllers/auth.controller.js";
import { isAuth } from "../middleware/isAuth.js";
import { loginMiddleware } from "../middleware/loginValidation.js";

const router = Router();

router.get("/", (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/booking/new");
  return res.redirect("/login");
});

router.get("/login", loginPage);
router.post("/login", loginMiddleware, userLogin);
router.post("/logout", isAuth, userLogout);

export default router;
