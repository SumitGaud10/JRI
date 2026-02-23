import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

passport.use(
  new Strategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    if (!user) return done(null, false);
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return done(null, false);

    return done(null, user);
  }),
);

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
