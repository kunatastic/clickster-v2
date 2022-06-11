// Importing the packages
import express, { Application } from 'express';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Import custom modules
import SocketInit from './Socket';
import { ioType } from './types/util';

const httpServer = createServer();
const io: ioType = new Server(httpServer);

const app: Application = express();

// Setting up the socket
SocketInit(io);

// Middlewares
app.use(morgan('dev'));

// Initializing the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Expresswer is listening at http://localhost:${PORT}`));
