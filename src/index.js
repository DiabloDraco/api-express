import express from "express";
import cors from "cors";
import videoRouter from "./routes/video.route.js";
import path from "path";
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const PORT = process.env.PORT || 3000;
const app = express();
app.set("trust proxy", true);

// const corsOptions = {
//     origin: 'http://expert.uz',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
app.use(cors());
app.use(express.json());
app.use(videoRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname) + "/views/index.html");
});

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
