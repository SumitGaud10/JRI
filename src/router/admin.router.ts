import { Router } from "express";
import { isAuth } from "../middleware/isAuth.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  adminHomePage,
  changePassword,
  createEntity,
  createUser,
  deleteEntity,
  deleteUser,
  editEntity,
  getAnEntity,
  getAUser,
} from "../controllers/admin.controller.js";

const router = Router();

router.use(isAuth);
router.use(isAdmin);

router.get("/", adminHomePage);
router.get("/user/:id", getAUser);
router.post("/user/passwd/:id", changePassword);
router.post("/user/delete/:id", deleteUser);
router.post("/user", createUser);
router.post("/entity", createEntity);
router.get("/entity/:id", getAnEntity);
router.post("/entity/delete/:id", deleteEntity);
router.post("/entity/:id", editEntity);

export default router;
