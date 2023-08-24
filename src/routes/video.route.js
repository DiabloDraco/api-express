import { Router } from "express";
import { DELETEVIDEO, GETVIDEO, GETVIDEONAMES, POSTVIDEO } from "../controllers/video.controller.js";
import multer from 'multer';


const upload = multer({
    dest: 'videos/', limits: {
        fileSize: 1073741824
    }
});


const videoRouter = Router()

videoRouter.get('/videos/getNames', GETVIDEONAMES)

videoRouter.post('/videos', upload.single('video'), POSTVIDEO);

videoRouter.get('/videos/:name', GETVIDEO);

videoRouter.delete('/videos/:name', DELETEVIDEO)

export default videoRouter