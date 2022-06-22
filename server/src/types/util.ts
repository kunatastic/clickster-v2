import { Server, Socket } from 'socket.io';
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
  movableItems: string[];
}

export interface RoomUserType {
  roomId: string;
  userId: string;
}

export interface JoinRoomType {
  roomId: string;
  userName: string;
}

export interface CreateRoomType {
  roomName: string;
  roomId: string;
  movableItem: number;
}

export interface GamePosition {
  x: number;
  y: number;
  roomId: string;
  roundId: string;
  captured: boolean;
}

export interface SpawnPosition {
  roomId: string;
  roundId: string;
}

export interface CustomSocketTypes extends Socket {
  roomId?: string;
}
