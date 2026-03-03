import { Router } from "express";
import { isAuth } from "../middleware/isAuth.js";
import {
  book,
  deleteBooking,
  detailedView,
  homePage,
  selectPage,
  view,
} from "../controllers/booking.controller.js";

const router = Router();

router.use(isAuth);

router.get("/new", homePage);
router.post("/select", selectPage);
router.post("/book", book);
router.get("/view", view);
router.get("/view/:id", detailedView);
router.post("/delete/:id", deleteBooking);

export default router;
