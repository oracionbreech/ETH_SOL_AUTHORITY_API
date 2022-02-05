import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

import * as log from './lib/logger';
import router from './routes';

import { config } from 'dotenv';
config();
/**
 * Online ordering API Service.
 */

const port = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://quickmeal.netlify.app']
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev', {}));

app.use(router);

export const server = http.createServer(app);

export let io: Server;

(async () => {
  if (process.env.NODE_ENV !== 'test') {
    io = new Server(server, {
      cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST']
      }
    });

    io.on('connection', () => {
      log.info(`A User connected.`);
    });

    server.listen(port, () => log.info('Online ordering service is now running'));
  }
})();

export default app;
