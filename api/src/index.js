import express from 'express';
import cors from 'cors';

const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`BlogApp API is listening at http://localhost:${port}`));
