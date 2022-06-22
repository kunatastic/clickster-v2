import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketProvider';
import { v4 as uuidv4 } from 'uuid';

import * as constants from '../constants';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface MovableType {
  x: number;
  y: number;
  roomId: string;
  captured: boolean;
  roundId: string;
}

function random() {
  const start = 5;
  const end = 95;
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

interface MovableProps {
  id: string;
}

function Movable(props: MovableProps) {
  const socketInfo = useContext(SocketContext);
  const params = useParams();
  const navigate = useNavigate();

  const [position, setPosition] = useState<MovableType>({
    x: random(),
    y: random(),
    roomId: params.roomId || '',
    captured: false,
    roundId: props.id,
  });

  function updatePosition() {
    socketInfo.socket?.emit(constants.SPAWN_NEW_LOCATION, {
      roomId: params.roomId,
      roundId: position.roundId,
    });
  }

  useEffect(() => {
    console.log('SPAWNED_LOCATION LISTENER ADDED');
    socketInfo.socket?.on(constants.SPAWNED_LOCATION, (data: any) => {
      console.log(data.location.roundId, position.roundId);
      if (data.msg === 'success') {
        if (data.location.roundId === position.roundId) {
          setPosition(data.location);
        }
      } else {
        console.log(data);
        toast.error(data.msg);
        navigate(`/`);
      }
      // console.log(data);
    });
    return () => {
      socketInfo.socket?.off(constants.SPAWNED_LOCATION);
      console.log('REMOVING SPAWNED_LOCATION LISTENER');
    };
  }, [position.roundId, socketInfo.socket]);

  return (
    <div
      className="bg-pink-600 bg-opacity-60 border-4 absolute cursor-pointer flex justify-center items-center rounded-full z-50"
      style={{
        top: `${position.x}%`,
        left: `${position.y}%`,
        height: '100px',
        width: '100px',
        transform: 'translate(-50%, -50%)',
        transition: 'all .15s linear',
      }}
      onMouseEnter={() => {
        updatePosition();
      }}
    >
      {position.captured ? '&#128508;' : '&#128508;'}
    </div>
  );
}

export default Movable;
