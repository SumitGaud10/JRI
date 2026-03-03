import express from "express";
import authRouter from "./router/auth.router.js";
import bookingRouter from "./router/booking.router.js";
import { fileURLToPath } from "node:url";
import path from "node:path";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import flash from "connect-flash";
import { flashMiddlware } from "./middleware/flash.js";
import connectDB from "./lib/db.js";
import "./lib/passport.js";
import passport from "passport";
import MongoStore from "connect-mongo";
import config from "./config/config.js";
import { errorMiddleware } from "./middleware/error.js";
import { NotFound } from "./middleware/notFound.js";

const app = express();

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/layout");

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: config.mongoUri,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(flashMiddlware);

app.use(authRouter);
app.use("/booking", bookingRouter);
app.use(NotFound);
app.use(errorMiddleware);

export default app;
