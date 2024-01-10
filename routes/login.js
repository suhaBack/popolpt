const router = require('express').Router()
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const connectDB = require("./../database");

let db;
connectDB
  .then((client) => {
    db = client.db("popolpt");
  })
  .catch((err) => {
    console.log(err);
  });


passport.use(
  new LocalStrategy(async (입력한아이디, 입력한비번, cb) => {
    let result = await db
      .collection("user")
      .findOne({ username: 입력한아이디 });
    if (!result) {
      return cb(null, false, { message: "아이디 DB에 없음" });
    }
    if (await bcrypt.compare(입력한비번, result.password)) {
      return cb(null, result);
    } else {
      return cb(null, false, { message: "비번불일치" });
    }
  })
);



  router.post("/", async (요청, 응답, next) => {
    passport.authenticate("local", (error, user, info) => {
      if (error) return 응답.status(500).json(error);
      if (!user) return 응답.status(401).json(info.message);
      요청.logIn(user, (err) => {
        if (err) return next(err);
        응답.redirect("/");
      });
    })(요청, 응답, next);
  });

  router.get("/logincheck", async (req, res) => {
    let user = req.user;
    res.status(201).send(user);
    // res.status(201).send({username: "ssp04364"});
  });
  
  router.get("/logout", async (req, res) => {
    res.clearCookie("connect.sid");
    res.status(201).send("로그아웃성공");
  });

module.exports = router