import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import passport from "passport";
import { Strategy as GoogleStratergy } from "passport-google-oauth20";
import { guser } from "../model/googleModel.js";

passport.serializeUser((user,done)=>{
  console.log("Inside Serialize User");
  console.log(user);
  done(null,user.id);
});

passport.deserializeUser((id, done) => {
  guser.findOne({ sub: id }, (err, user) => {
    done(err, user);
  });
});

export default passport.use(
  new GoogleStratergy(
    {
      clientID:
        process.env.CLIENT_ID,
      clientSecret:
        process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const findUser = await guser.findOne({ sub: profile.sub });
        if (findUser) {
          return done(null, findUser);
        }
        console.log("profile ==>", profile);
        const newUser = new guser({
          sub: profile._json.sub,
          given_name: profile._json.given_name,
          family_name: profile._json.family_name,
          picture: profile._json.picture,
          email: profile._json.email,
        });
        const newSavedUser = await newUser.save();
        return done(null, newSavedUser);
      } catch (error) {
        console.error(error);
      }
    }
  )
);
