import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { logger } from './middlewares/logger.js';
import dotenv from 'dotenv';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import notesRouter from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errors } from 'celebrate';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(authRoutes);
app.use(notesRouter);

app.use(errors());
app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
