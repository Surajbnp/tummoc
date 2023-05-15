const session = require("express-session");
const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./passport-setup");

const app = express();

app.use(
  session({
    secret: "SECRET8809",
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout;
  res.redirect("/");
});

app.get("/dashboard", (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`You have visited this page ${req.session.views} times`);
  } else {
    req.session.views = 1;
    res.send("Welcome to this page for the first time!");
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/dashboard");
  }
);

app.listen(8080, () => {
  console.log("Server listening on port", 8080);
});
