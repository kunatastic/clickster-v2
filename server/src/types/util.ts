import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export type ioType = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export interface Player {
  id: string;
  name: string;
  points: number;
}

export interface Room {
  id: string;
  name: string;
  users: Player[];
}
