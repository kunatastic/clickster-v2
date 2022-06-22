import React, { createContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_TOKEN_KEY, SOCKET_URI } from '../config';
import * as constants from '../constants';

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketContext = createContext<{
  socket: Socket | null;
}>({
  socket: null,
});

function SocketContextProvider(props: SocketProviderProps) {
  const [socket, setSocket] = React.useState<Socket | null>(null);

  React.useEffect(() => {
    const socket = io(SOCKET_URI);
    setSocket(socket);

    socket.on('connect', () => {
      console.log('connected', socket.id);

      // check if the socket id is present in the local storage
      // if it is, then send the socket id to the server
      // so that the server can identify the user
      const socketId = localStorage.getItem(SOCKET_TOKEN_KEY);
      if (!socketId) {
        localStorage.setItem(SOCKET_TOKEN_KEY, socket.id);
      } else {
        socket.emit(constants.UPDATE_SOCKET_ID, socketId);
      }
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socket,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;
