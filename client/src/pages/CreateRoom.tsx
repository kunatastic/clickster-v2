import React, { useContext, useEffect, useState } from 'react';
import SubmitButton from '../components/SubmitButton';
import Input from '../components/Input';
import Nav from '../components/Nav';
import { SocketContext } from '../context/SocketProvider';
import * as constants from '../constants';
import { RoomData } from '../types';
import { useNavigate } from 'react-router-dom';

function CreateRoom() {
  const [formData, setFormData] = useState<{ roomId: string; roomName: string }>({
    roomId: 'uorwen',
    roomName: 'Kunal',
  });

  const socketInfo = useContext(SocketContext);
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(formData);
    socketInfo.socket?.emit(constants.CREATE_ROOM, formData);
  }

  useEffect(() => {
    socketInfo.socket?.on(constants.ROOM_CREATED, (data: RoomData) => {
      if (data.msg === 'success') {
        navigate(`/playground/${data?.room?.id}`);
      } else {
        alert(data.msg);
      }
    });

    return () => {
      socketInfo.socket?.off(constants.ROOM_CREATED);
      console.log('unsubscribed from room created');
    };
  }, [navigate, socketInfo.socket]);

  return (
    <>
      <Nav />
      <div className="flex justify-center h-full items-center">
        <div
          className="bg-black bg-opacity-50 rounded-xl shadow-2xl border-2 border-orange-500"
          style={{ backdropFilter: 'blur(4px)' }}
        >
          <form
            className="flex flex-col justify-center items-center py-12 px-10"
            onSubmit={handleSubmit}
          >
            <h1 className="text-4xl font-bold text-gray-100 text-center py-2">Create a new room</h1>
            <div className="w-full flex flex-col justify-center items-center">
              <Input
                type="text"
                value={formData.roomName}
                onChange={e => setFormData({ ...formData, roomName: e.target.value })}
                placeholder="Room Name"
              />
              <Input
                type="text"
                value={formData.roomId}
                onChange={e => setFormData({ ...formData, roomId: e.target.value })}
                placeholder="Room ID"
              />
              <SubmitButton text="Create room" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateRoom;
