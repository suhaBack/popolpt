const express = require("express");
const path = require("path");
const app = express();
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { ObjectId } = require("mongodb");

app.use(express.json());
var cors = require("cors");
app.use(cors());
require("dotenv").config();

const connectDB = require("./database.js");

let db
connectDB
  .then((client) => {
    db = client.db('popolpt');
    console.log("DB연결성공");
    app.listen(process.env.PORT, function () {
      console.log("listening on 3001"); // 포트 번호 수정
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(passport.initialize());
app.use(
  session({
    secret: "암호화에 쓸 비번",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      dbName: "popolpt",
    }),
  })
);
app.use(passport.session()); //이새끼 무조건 필요함 그래야 req.user받아줌

passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, { id: user._id, username: user.username });
  });
});

passport.deserializeUser(async (user, done) => {
  let result = await db
    .collection("user")
    .findOne({ _id: new ObjectId(user.id) });
  delete result.password;
  process.nextTick(() => {
    return done(null, result);
  });
});

app.use(express.static(path.join(__dirname, "popol/hearthstone/build")));

app.get("/", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "/popol/hearthstone/build/index.html"));
});

app.use("/list1", require("./routes/list.js"));
app.use("/write", require("./routes/write.js"));
app.use("/Sdetail", require("./routes/detail.js"));
app.use("/edit", require("./routes/edit.js"));
app.use("/delete", require("./routes/delete.js"));
app.use("/login", require("./routes/login.js"));
app.use("/register", require("./routes/register.js"));
app.use("/Scomment", require("./routes/comment.js"));
app.use("/cardupload", require("./routes/cardupload.js"));

app.get("*", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "/popol/hearthstone/build/index.html"));
});
