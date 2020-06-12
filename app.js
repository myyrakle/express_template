const createError = require("http-errors");
const express = require("express");
const app = express();

// 내장 미들웨어 연결
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 서드파티 미들웨어 연결
app.use(require("cookie-parser"));

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

// 라우터 등록
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
