const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then((existingUser) => {
        if (existingUser) {
          //we have a record of this id
          done(null, existingUser);
        } else {
          //no record of id
          new User({ googleID: profile.id })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.FACEBOOK_APP_ID,
      clientSecret: keys.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ facebookId: profile.id }).then((existingUser) => {
        if (existingUser) {
          //we have a record of this id
          done(null, existingUser);
        } else {
          //no record of id
          new User({ facebookId: profile.id })
            .save()
            .then((user) => done(null, user));
          console.loh(profile);
        }
      });
    }
  )
);
