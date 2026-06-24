const http = require("http")
const server = http.createServer((req, res) => {
  const url = req.url
  const header = req.header
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html")
  
    res.end(
      `
    <form>
    <label>Name:</label>
    <input type="text" name="username"></input>
    <button type="submit">Add</button>
    </form>
    `
    )
  }
})

server.listen(3000, () => {
  console.log("server is running on port 3000")
})