import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SocketContext } from '../context/SocketProvider';
import * as constants from '../constants';
import Movable from '../components/Movable';
import LeaderBoard from '../components/LeaderBoard';
import { CLICKSTER_USER_KEY } from '../config';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function Game() {
  let params = useParams();
  let navigate = useNavigate();
  const socketInfo = useContext(SocketContext);

  const [isLoading, setIsLoading] = useState(true);
  const [movableButtons, setMovableButtons] = useState<string[]>([]);

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
  }, [navigate, socketInfo.socket]);

  useEffect(() => {
    socketInfo.socket?.on(constants.NEW_USER_ROOM_JOINED, (data: any) => {
      if (data.msg === 'success') {
        toast.success(`${data.user.userName} joined the room`);
      }
    });

    socketInfo.socket?.on(constants.ROOM_JOINED, (data: any) => {
      if (data.msg === 'success') {
        console.log(data.room.movableItems);
        setMovableButtons(data.room.movableItems);
        toast.success('Joined room successfully');
        setIsLoading(false);
      } else {
        toast.error(data.msg);
        navigate('/', { replace: true });
      }
    });

    return () => {
      socketInfo.socket?.off(constants.NEW_USER_ROOM_JOINED);
      socketInfo.socket?.off(constants.ROOM_JOINED);
    };
  }, [socketInfo.socket]);

  if (isLoading) return <Loader />;
  return (
    <div className="w-full h-full relative select-none flex items-center justify-center">
      <LeaderBoard />
      {movableButtons.map((id, i) => (
        <Movable key={i} id={id} />
      ))}
      <div className=" blur-[1px] font-extrabold text-6xl text-center z-0">
        <h1 className="text-gray-500 text-2xl">Invite your friends to</h1>
        <h1 className="text-orange-900">{params.roomId}</h1>
      </div>
    </div>
  );
}

export default Game;
