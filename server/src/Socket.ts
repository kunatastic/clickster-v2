/**
 * Features to be performed by the socket
 * 1. Create a new room
 * 2. Join a room by room id
 * 3. Leave a room
 * 4. spawn new location
 */

import { Socket } from 'socket.io';
import * as constants from './constants';
import { ioType, Player, Room } from './types/util';

const rooms: Room[] = [];

class Connection {
  io: ioType;

  socket: Socket;

  constructor(io: ioType, socket: Socket) {
    this.io = io;
    this.socket = socket;

    socket.on(constants.CREATE_ROOM, (data: any) => this.createRoom(data));
    socket.on(constants.JOIN_ROOM, (data: any) => this.joinRoom(data));
    socket.on(constants.LEAVE_ROOM, (data: any) => this.leaveRoom(data));
  }

  createRoom(data: any) {
    const room: Room = { id: data.id, name: data.name, users: [] };
    rooms.push(room);
    this.io.sockets.emit(constants.ROOM_CREATED, room);
  }

  joinRoom(data: any) {
    const room: Room = rooms.find((r: Room) => r.id === data.id);
    if (!room) return;
    room.users.push({ id: this.socket.id, name: data.name, points: 0 });
    this.socket.join(room.id);
    this.io.sockets.in(room.id).emit(constants.ROOM_JOINED, room);
  }

  leaveRoom(data: any) {
    const room: Room = rooms.find((r: Room) => r.id === data.id);
    if (!room) return;
    const user: Player = room.users.find((u: Player) => u.id === this.socket.id);
    if (user) room.users = room.users.filter((u: Player) => u.id !== this.socket.id);
    if (room.users.length === 0) rooms.splice(rooms.indexOf(room), 1);
    this.socket.leave(room.id);
    this.io.sockets.in(room.id).emit(constants.ROOM_LEFT, room);
  }
}

function SocketInitial(io: ioType) {
  io.on('connection', (socket: Socket) => {
    const _ = new Connection(io, socket);
  });
}

export default SocketInitial;
