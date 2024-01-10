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

  router.get("/:id", async (req, res) => {
    let id = req.params.id
    console.log(id);
    let result = await db.collection("comment").find({
      postId: id
    }).toArray()
    console.log(result);
    res.status(201).send(result)
  });

router.post("/", async (req, res) => {
  console.log(req.body);
  await db.collection("comment").insertOne({
    postId: req.body.postId,
    username: req.body.username,
    comment: req.body.comment
  })
  res.status(201).send("성공")
});

module.exports = router