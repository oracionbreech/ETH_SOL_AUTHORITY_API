import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import * as log from './lib/logger';
import router from './routes';

import { config } from 'dotenv';
import { MongooseInit } from './services/mongo';
config();
/**
 * Online ordering API Service.
 */

const port = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ALLOW.split(',')
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev', {}));

app.set('trust proxy', true);

app.use(router);

(async () => {
  await MongooseInit();
  if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => log.info('Online ordering service is now running'));
  }
})();

export default app;
