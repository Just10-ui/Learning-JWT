import express from 'express';
import dotenv from 'dotenv';
import router from '../routes/router.js';
import { crossOrig, parseJson} from '../middleware/middleware.js';

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(parseJson);
app.use(crossOrig);
app.use('/', router);

app.listen(port, () => {
  console.log(`PORT running on http://localhost:${port}`);
});