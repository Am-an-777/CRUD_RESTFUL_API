import dotenv from "dotenv";
dotenv.config();
import express from "express";
import session from 'express-session';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import passport, { Passport } from "passport";
import route from "./routes/userRoutes.js";
import "./stratergies/google-stratergies.js";

const app = express();

app.use(session({
    secret: process.env.CLIENT_SECRET ,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Set to true if using HTTPS / Set to false if using HTTP
}));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 8080;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log("error:", err));

app.get("/auth/google", passport.authenticate("google"));
app.get("/auth/google/callback", passport.authenticate("google"),(req,res)=>{
    res.sendStatus(200)
});
app.use("/user", route);
