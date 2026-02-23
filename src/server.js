import express from 'express';
import cors from 'cors';
import logger from './middleware/logger.js';
import pinoHttp from 'pino-http';
import dotenv from 'dotenv';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRouter from './routes/notesRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(pinoHttp({ logger }));

app.use(notesRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
