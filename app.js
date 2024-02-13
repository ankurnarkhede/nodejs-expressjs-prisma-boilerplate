const createError = require("http-errors");
const express = require("express");

// import app middlewares
const AppMiddlewares = require("./middlewares");

// import routes
const indexRouter = require("./routes/index");

// Initialise express
const app = express();

// Add Middlewares
AppMiddlewares(app);

// Add routes
app.use("/api/v1", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, _res, next) {
  logger.error(`API not found:: ${req.originalUrl}`);
  next(createError(404));
});

// error handler
app.use(function (err, req, res, _next) {
  logger.error(
    `Error handling the request:: ${req.originalUrl}, error:: `,
    err
  );

  const statusCode = err.status || 500;
  return res.boom.boomify(err, {
    statusCode,
    message: err.message,
  });
});

module.exports = app;
