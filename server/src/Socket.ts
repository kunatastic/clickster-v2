/**
 * Features to be performed by the socket
 * 1. Create a new room
 * 2. Join a room by room id
 * 3. Leave a room
 * 4. spawn new location
 */

import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import * as constants from './constants';
import { ioType, Player, Room } from './types/util';

const rooms: Room[] = [];

interface RoomUserType {
  roomId: string;
  userId: string;
}

interface JoinRoomType {
  roomId: string;
  userName: string;
}

interface CreateRoomType {
  roomName: string;
  roomId: string;
}

interface GamePosition {
  x: number;
  y: number;
  roomId: string;
  roundId: string;
  captured: boolean;
}

interface SpawnPosition {
  roomId: string;
  roundId: string;
}

class Connection {
  io: ioType;

  socket: Socket;

  constructor(io: ioType, socket: Socket) {
    this.io = io;
    this.socket = socket;

    socket.on(constants.CREATE_ROOM, (data: CreateRoomType) => this.createRoom(data));
    socket.on(constants.JOIN_ROOM, (data: any) => this.joinRoom(data));
    socket.on(constants.LEAVE_ROOM, (data: any) => this.leaveRoom(data));
    socket.on(constants.UPDATE_SOCKET_ID, (data: any) => this.updateSocketId(data));
    // socket.on(constants.CHECK_ROOM_USER, (data: any) => this.checkRoomUser(data));

    socket.on(constants.SPAWN_NEW_LOCATION, (data: SpawnPosition) => this.spawnLocation(data));
  }

  createRoom(data: CreateRoomType) {
    const roomPresent = rooms.find((r: Room) => r.id === data.roomId);
    if (roomPresent) {
      this.socket.emit(constants.ROOM_CREATED, { msg: 'Room already exists', room: null });
      return;
    }
    const room: Room = { id: data.roomId, name: data.roomName, users: [] };
    rooms.push(room);
    console.log(`[+] Room created: ${room.id}`);
    this.socket.emit(constants.ROOM_CREATED, { msg: 'success', room });
  }

  joinRoom(data: JoinRoomType) {
    console.log('[+] User joined room: ', this.socket.id);
    this.socket.name = data.userName;
    const room: Room = rooms.find((r: Room) => r.id === data.roomId);
    if (!room) {
      console.log('[-] Room not found', data);
      this.socket.emit(constants.ROOM_JOINED, { msg: 'Room not found', room: null });
      return;
    }
    room.users.push({ id: this.socket.id, name: data.userName, points: 0 });
    this.socket.join(room.id);
    this.socket.emit(constants.ROOM_JOINED, { msg: 'success', room });
    // this.io.sockets.in(room.id).emit(constants.NEW_USER_ROOM_JOINED, room);
    console.log('[+] User joined room: ', room);
  }

  leaveRoom(data: Partial<RoomUserType>) {
    const room: Room = rooms.find((r: Room) => r.id === data.roomId);
    if (!room) return;
    const user: Player = room.users.find((u: Player) => u.id === this.socket.id);
    if (user) room.users = room.users.filter((u: Player) => u.id !== this.socket.id);
    if (room.users.length === 0) rooms.splice(rooms.indexOf(room), 1);
    this.socket.leave(room.id);
    this.io.sockets.in(room.id).emit(constants.ROOM_LEFT, room);
  }

  updateSocketId(data: RoomUserType) {
    const room: Room = rooms.find((r: Room) => r.id === data.roomId);
    if (!room) return;
    const user: Player = room.users.find((u: Player) => u.id === data.userId);
    if (user) user.id = this.socket.id;
  }

  // checkRoomUser(data: RoomUserType) {
  //   const room = rooms.find((r: Room) => r.id === data.roomId);
  //   if (!room) ;
  //   const user = room.users.find((u: Player) => u.id === data.userId);
  //   return !!user;
  // }

  spawnLocation(data: { roomId: string; roundId: string }) {
    console.log('[+] Spawning location called by', this.socket.id);
    const room: Room = rooms.find((r: Room) => r.id === data.roomId);
    if (!room) {
      this.socket.emit(constants.SPAWNED_LOCATION, { msg: 'Room not found', location: null });
      return;
    }
    const location: GamePosition = {
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
      roomId: room.id,
      roundId: data.roundId === '-1' ? uuidv4() : data.roundId,
      captured: false,
    };
    this.io.sockets.in(room.id).emit(constants.SPAWNED_LOCATION, { msg: 'success', location });
  }
}

function SocketInitial(io: ioType) {
  io.on('connection', (socket: Socket) => {
    console.log('Client connected', socket.id);
    const _ = new Connection(io, socket);

    socket.on('disconnect', () => console.log('Client disconnected', socket.id));
  });
}

export default SocketInitial;
