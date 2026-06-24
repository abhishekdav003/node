const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.setHeader("Content-Type", "text/html");

    res.end(`
      <form action="/message" method="POST">
        <label>Name:</label>
        <input type="text" name="username">
        <button type="submit">Add</button>
      </form>
    `);
  } else if (req.url === "/message" && req.method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const buffer = Buffer.concat(body);
      const formData = buffer.toString();

      const username = formData.split("=")[1];

      fs.writeFile("message.txt", username, (err) => {
        if (err) {
          console.log(err);
          return;
        }

        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
      });
    });
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
