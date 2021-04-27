import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import setRoutes from './routes/routes.js';

dotenv.config();
const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());

setRoutes(app);

app.listen(port, () => console.log(`BlogApp API is listening at http://localhost:${port}`));
