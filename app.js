const fs = require("fs");
const http = require("http");

const Files = {
  INDEX: "index.html",
  NOT_FOUND: "404.html",
  ABOUT: "about.html",
  CONTACT: "contact-me.html",
};

function respondWithFile(res, file) {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.readFile(file, function (err, data) {
    if (err) throw err;
    res.end(data);
  });
}

http
  .createServer(function (req, res) {
    // determine the URL
    const url = req.url;
    // map the URL to a target
    let target = url === "/" ? "index" : url.substring(1);
    target = target.endsWith(".html") ? target : target + ".html";
    // map the target to a file
    switch (target) {
      case Files.INDEX:
      case Files.ABOUT:
      case Files.CONTACT:
        respondWithFile(res, target);
        break;
      default:
        respondWithFile(res, Files.NOT_FOUND);
    }
  })
  .listen(8080);
