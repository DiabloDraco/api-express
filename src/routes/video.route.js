import { Router } from "express";
import { DELETEVIDEO, GETVIDEO, GETVIDEONAMES, POSTVIDEO } from "../controllers/video.controller.js";
import multer from 'multer';
import checkToken from "../middlewares/checkToken.js";


const upload = multer({
    dest: 'videos/', limits: {
        fileSize: 1073741824
    }
});


const videoRouter = Router()

videoRouter.get('/videos/getNames', checkToken, GETVIDEONAMES)

videoRouter.post('/videos', checkToken, upload.single('video'), POSTVIDEO);

videoRouter.get('/videos/:name', checkToken, GETVIDEO);

videoRouter.delete('/videos/:name', checkToken, DELETEVIDEO)

export default videoRouter