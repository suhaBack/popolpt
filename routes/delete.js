const router = require('express').Router()
const connectDB = require("./../database");
const { ObjectId } = require("mongodb");

let db;
connectDB
  .then((client) => {
    db = client.db("popolpt");
  })
  .catch((err) => {
    console.log(err);
  });

  router.post("/:id", async (req, res) => {
    let id = req.params.id;
    await db.collection("post").deleteOne({ _id: new ObjectId(id) });
    let result = await db.collection("post").find().toArray();
    res.status(201).send(result);
  });

module.exports = router