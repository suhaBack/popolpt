const router = require('express').Router()
const connectDB = require("./../database");
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

router.post("/", upload.single("img"), async (req, res) => {
  console.log("glgl");
  console.log("req.body: ", req.body);
  console.log("image: ", req.file.location);
  // await db.collection("post").find().toArray();
  // res.status(201).send(result);
});

module.exports = router