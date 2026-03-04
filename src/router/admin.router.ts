import { Router } from "express";
import { isAuth } from "../middleware/isAuth.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  adminHomePage,
  changePassword,
  getAUser,
} from "../controllers/admin.controller.js";

const router = Router();

router.use(isAuth);
router.use(isAdmin);

router.get("/", adminHomePage);
router.get("/user/:id", getAUser);
router.post("/user/passwd/:id", changePassword);

export default router;
