const express = require("express");
const path = require("path");
// MIDDLEWARE
// logging with morgan
const logger = require("morgan");
// compress all responses
const compression = require("compression");
// allow CORS
const cors = require("cors");
// add some security middleware
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
// 404 handler
function handle404(req, res, next) {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
}

const app = express();
const port = 3000;

app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: "*", // Allow all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow common methods
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(compression());
app.use(logger("dev"));

app.use(
  express.static("public", {
    extensions: ["html", "htm"],
  })
);
app.use(handle404);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
