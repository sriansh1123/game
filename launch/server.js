import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, "..");

app.use(express.static(ROOT));

app.use((req, res) => {
  res.sendFile(path.join(ROOT, "index.html"));
});

app.listen(PORT, () => console.log("[server] running at http://localhost:" + PORT));