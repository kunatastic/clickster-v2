export interface RoomData {
  msg: string;
  room: Room | null;
}

export interface Room {
  id: string;
  name: string;
  users: User[];
}

export interface User {
  id: string;
  name: string;
  points: number;
}
