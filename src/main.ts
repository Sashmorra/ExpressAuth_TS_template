import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes/index.routes.js';
import ErrorHandler from './middleware/error.handler.js';
import { connection } from './config/db.js';
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

const start = async () => {
  try {
    app.use(cors());
    app.use(express.json());
    app.use('/api', router);
    app.use(ErrorHandler);
    await connection();
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  } catch (err: unknown) {
    console.log(err);
  }
};
start();
