import { Router } from "express";
import {
  DELETEVIDEO,
  GETVIDEO,
  GETVIDEONAMES,
  POSTVIDEO,
  TEST,
} from "../controllers/video.controller.js";
import multer from "multer";
import checkToken from "../middlewares/checkToken.js";

const upload = multer({
  dest: "./videos/",
  limits: {
    fileSize: 1073741824,
  },
});

const videoRouter = Router();

videoRouter.get("/videos/getNames", GETVIDEONAMES);

videoRouter.post("/videos", upload.single("video"), POSTVIDEO);

videoRouter.get("/videos", GETVIDEO);

videoRouter.delete("/videos/:name", DELETEVIDEO);

videoRouter.get("/test", TEST);

export default videoRouter;
