require("rootpath")();
require("dotenv").config();

const jwt = require("./middleware/jwt");
const errorHandler = require("./middleware/error-handler");
const initialize = require("./init");

const users = require("./routes/auth");
const books = require("./routes/books");

const app = initialize();

// use JWT auth to secure the api
app.use(jwt());

// global error handler
app.use(errorHandler);

// api routes
app.use("/users", users);
app.use("/books", books);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// start server
const port = process.env.PORT || 5555;
app.listen(port, function () {
  console.log("Server listening on port " + port);
});

module.exports = app;
