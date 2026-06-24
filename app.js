const http = require("http");
const handle = require("./routes")
handle.checking()

const server = http.createServer(handle)

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
