// Importing the packages
import express, { Application } from 'express';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
// import path from 'path';

// Import custom modules
import SocketInit from './Socket';
import { ioType } from './types/util';

// load .dotenv variable globally
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
/* eslint-enable */

const app: Application = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: '*' }));

// Setting up the socket
const httpServer = createServer(app);
const io: ioType = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

SocketInit(io);

// // add this
// app.get('/socket.io/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../node_modules/socket.io/client-dist/socket.io.js'));
// });

// Initializing the server
const PORT = process.env.PORT || 5001;
httpServer.listen(PORT, () => console.log(`Express is listening at http://localhost:${PORT}`));
