const router = require("express").Router();
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

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let result = await db.collection("post").findOne({
    _id: new ObjectId(id),
  });
  res.status(201).send(result);
});

module.exports = router;
