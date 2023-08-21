import express from 'express';
import cors from 'cors'
import videoRouter from './routes/video.route.js';

const PORT = process.env.PORT || 3000
const app = express();
app.use(cors())
app.use(express.json())
app.use(videoRouter)

app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});
