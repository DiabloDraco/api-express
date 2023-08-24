import express from 'express';
import cors from 'cors'
import videoRouter from './routes/video.route.js';

const PORT = process.env.PORT || 3000
const app = express();

const corsOptions = {
    origin: 'http://expert.uz',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(videoRouter)

app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});
