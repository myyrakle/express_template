const createError = require("http-errors");
const express = require("express");
const app = express();

// 내장 미들웨어 연결
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 서드파티 미들웨어 연결
const cors = require("cors");
const expressSession = require("express-session");
app.use(require("cookie-parser")());
app.use(
  expressSession({
    secret: "foo", // 비밀 키
    user_no: "",
    user_type: "",
    proxy: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 30, // 30분
    },
  })
);
app.use(
  cors({
    origin: ["http://localhost:3000"], // 허용 도메인 목록
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// 로거 등록
const morgan = require("morgan");
const { stream } = require("./middleware/winston.config");
app.use(morgan("combined", { stream }));

// 정적파일 제공
app.use(express.static("./public"));
app.use(express.static("./test"));

// 사용자 정의 미들웨어 연결
app.use(require("./middleware/db"));
app.use(require("./middleware/auth"));
app.use(require("./middleware/winston"));

// view engine setup
app.set("views", "./views");
app.set("view engine", "ejs");

// 라우터 등록
app.get("/", (req, res, next) => {
  res.json("fpp");
});
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

// catch 404 and forward to error handler
app.use((request, response, next) => {
  next(createError(404));
});

// error handler
app.use((error, request, response, next) => {
  // set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = request.app.get("env") === "development" ? error : {};

  // render the error page
  response.status(error.status || 500);
  response.send("error");
});

module.exports = app;
