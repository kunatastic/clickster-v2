import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SocketContext } from '../context/SocketProvider';
import * as constants from '../constants';
import Movable from '../components/Movable';
import LeaderBoard from '../components/LeaderBoard';
import { CLICKSTER_USER_KEY } from '../config';
import { toast } from 'react-toastify';

function Game() {
  let params = useParams();
  let navigate = useNavigate();

  const MOVALBLE_BUTTONS = 2;

  const socketInfo = useContext(SocketContext);

  useEffect(() => {
    const userName = localStorage.getItem(CLICKSTER_USER_KEY);
    console.log(userName);
    if (!userName) {
      navigate(`/join-room/?roomId=${params.roomId}`);
      toast('Please join a room first');
      return;
    }

    socketInfo.socket?.emit(constants.JOIN_ROOM, { roomId: params.roomId, userName });

    return () => {
      socketInfo.socket?.off(constants.JOIN_ROOM);
    };
  }, [socketInfo.socket, params.roomId, navigate]);

  useEffect(() => {
    socketInfo.socket?.on(constants.NEW_USER_ROOM_JOINED, (data: any) => {
      console.log(data);
    });

    socketInfo.socket?.on(constants.ROOM_JOINED, (data: any) => {
      console.log(data);
    });

    return () => {
      socketInfo.socket?.off(constants.NEW_USER_ROOM_JOINED);
      socketInfo.socket?.off(constants.ROOM_JOINED);
    };
  }, []);

  return (
    <div className="bg-black bg-opacity-70 w-full h-full relative select-none">
      <LeaderBoard />
      {[...Array(MOVALBLE_BUTTONS)].map((_, i) => (
        <Movable key={i} />
      ))}
      <h1 className="text-white text-center font-extrabold text-6xl">Room Id: {params.roomId}</h1>
    </div>
  );
}

export default Game;
