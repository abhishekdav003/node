const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/home") {
    res.end("Welcome home");
  } else if (req.url === "/about") {
    res.end("Welcome to About Us");
  } else if (req.url === "/node") {
    res.end("Welcome to my Node Js project");
  } else {
    res.end("Page Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
