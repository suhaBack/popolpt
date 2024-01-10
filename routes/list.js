const router = require('express').Router()
const connectDB = require("./../database");

let db;
connectDB
  .then((client) => {
    db = client.db("popolpt");
  })
  .catch((err) => {
    console.log(err);
  });

router.get("/", async (req, res) => {
  let result = await db.collection("post").find().toArray();
  res.status(201).send(result);
});

module.exports = router