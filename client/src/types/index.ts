export interface RoomData {
  msg: string;
  room: Room | null;
}

export interface Room {
  id: string;
  name: string;
  users: User[];
  movableItems: string[];
}

export interface User {
  id: string;
  name: string;
  points: number;
}
