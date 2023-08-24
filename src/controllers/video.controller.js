import fs from 'fs';
import multer from 'multer';
import path from 'path';


export let GETVIDEO = async (req, res) => {
    try {
        const videoName = req.query.video;
        const videoPath = `videos/${videoName}`;

        if (!fs.existsSync(videoPath)) {
            return res.status(404).send('Video not found.');
        }

        const duration = await getVideoDurationInSeconds(videoPath);

        // Устанавливаем заголовок с продолжительностью видео
        res.setHeader('Content-Duration', duration);

        const videoStream = fs.createReadStream(videoPath);
        videoStream.pipe(res);
    } catch (error) {
        return res.status(500).send({ status: 500, message: 'Error', reason: error.message })
    }
}

export let POSTVIDEO = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No video uploaded.');
        }

        const originalFileName = req.file.originalname;
        const extension = path.extname(originalFileName);
        const newFileName = `${req.file.filename}${extension}`;
        const oldPath = `videos/${req.file.filename}`;
        const newPath = `videos/${newFileName}`;

        fs.renameSync(oldPath, newPath);

        return res.status(200).send({ status: 200, name: newFileName, old: oldPath });
    } catch (error) {
        return res.status(500).send({ status: 500, message: 'Error', reason: error.message })
    }
}

export let DELETEVIDEO = (req, res) => {
    try {
        const videoName = req.params.name;
        const videoPath = `videos/${videoName}`;

        if (!fs.existsSync(videoPath)) {
            return res.status(404).send('Video not found.');
        }

        fs.unlinkSync(videoPath)

        return res.status(200).json({ status: 200, message: 'Video ' + videoName + ' Deleted successful' })
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Error', reason: error.message })
    }
}

export let GETVIDEONAMES = (req, res) => {
    try {
        const testFolder = './videos/';
        let files = []

        fs.readdirSync(testFolder).forEach(file => {
            files.push({ fileName: file })
        });

        res.status(200).json({ status: 200, files: files, fileCount: files.length })
    } catch (error) {
        res.status(400).json({ status: 400, message: error.message })
    }
}

const getVideoDurationInSeconds = (videoPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(videoPath, (err, data) => {
            if (err) {
                console.error('Ошибка при чтении видеофайла:', err);
                reject(err);
            } else {
                // Поиск продолжительности видео в метаданных (байт 20-27 для MP4-файлов)
                const durationOffset = 20;
                const durationLength = 8;
                const duration = data.readDoubleBE(durationOffset);
                // Преобразование продолжительности в секунды (округление до целого числа)
                const durationInSeconds = Math.round(duration);
                resolve(durationInSeconds);
            }
        });
    });
};
