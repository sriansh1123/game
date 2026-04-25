const express = require("express");
const http = require("http");
const path = require("path");
const { createBareServer } = require("@tomphttp/bare-server-node");
const { uvPath } = require("@titaniumnetwork-dev/ultraviolet");
const { publicPath } = require("ultraviolet-static");

const app = express();
const bare = createBareServer("/bare/");

app.use(express.static(path.join(__dirname, "..")));
app.use("/uv/", express.static(uvPath));
app.use("/uv/", express.static(publicPath));

const server = http.createServer();

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) bare.routeRequest(req, res);
  else app(req, res);
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) bare.routeUpgrade(req, socket, head);
  else socket.end();
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => console.log("Server on " + PORT));