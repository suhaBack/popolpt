const router = require("express").Router();
const connectDB = require("./../database");
const { ObjectId } = require("mongodb");
const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "popolpt",
    key: function (요청, file, cb) {
      cb(null, Date.now().toString()); //업로드시 파일명 변경가능
    },
  }),
});

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

router.post("/:id", upload.single("img"), async (req, res) => {
  let id = req.params.id;
  let title = req.body.title;
  let content = req.body.content;
  await db
    .collection("post")
    .updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: title,
          content: content,
          image: req.file ? req.file.location : "",
        },
      }
    );
  res.status(201).send("성공");
});

module.exports = router;
