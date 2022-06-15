import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../context/SocketProvider';
import * as constants from '../constants';

function Game() {
  let params = useParams();

  const socketInfo = useContext(SocketContext);

  useEffect(() => {
    socketInfo.socket?.emit(constants.JOIN_ROOM, params.roomId);

    return () => {
      socketInfo.socket?.off(constants.JOIN_ROOM);
    };
  }, [socketInfo.socket, params.roomId]);

  return (
    <h1 className="text-white text-center font-extrabold text-6xl">Invoice {params.roomId}</h1>
  );
}

export default Game;
