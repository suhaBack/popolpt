const router = require('express').Router()
const connectDB = require("./../database");
const bcrypt = require("bcrypt");

let db;
connectDB
  .then((client) => {
    db = client.db("popolpt");
  })
  .catch((err) => {
    console.log(err);
  });

  router.post("/", async (req, res) => {
    let username = req.body.id;
    let password = await bcrypt.hash(req.body.pw, 10);
    let result = await db.collection("user").findOne({
      username: username,
    });
    if (result) {
      res.status(400).send("실패");
    } else {
      await db.collection("user").insertOne({
        username: username,
        password: password,
      });
      res.status(201).send("성공");
    }
  });

module.exports = router