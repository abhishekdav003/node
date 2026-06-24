const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    let message = "";

    try {
      message = fs.readFileSync("message.txt", "utf8");
    } catch (err) {}

    res.setHeader("Content-Type", "text/html");

    res.end(`
      <html>
        <body>
          <h2>${message}</h2>

          <form action="/message" method="POST">
            <input type="text" name="username">
            <button type="submit">Submit</button>
          </form>

        </body>
      </html>
    `);
  } else if (req.url === "/message" && req.method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();

      const username = parsedBody.split("=")[1];

      fs.writeFileSync("message.txt", username);

      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    });
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
