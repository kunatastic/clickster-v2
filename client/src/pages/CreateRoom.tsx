import React, { useContext, useEffect, useState } from 'react';
import SubmitButton from '../components/SubmitButton';
import Input from '../components/Input';
import Nav from '../components/Nav';
import { SocketContext } from '../context/SocketProvider';
import * as constants from '../constants';
import { RoomData } from '../types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from '../components/Modal';
import { Dialog } from '@headlessui/react';
import CopyInviteLink from '../components/CopyInviteLink';

function CreateRoom() {
  const [formData, setFormData] = useState<{ roomId: string; roomName: string }>({
    roomId: 'uorwen',
    roomName: 'Kunal',
  });

  const [showModal, setShowModal] = useState(false);

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
        // navigate(`/join-room/?roomId=${data.room?.id}`);
        toast.success('Room created successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setShowModal(true);
      } else {
        toast.error('12312' + data.msg, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setShowModal(true);
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
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          children={
            <>
              <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                Copy the invite link below
              </Dialog.Title>
              <CopyInviteLink
                url={`${window.location.origin}/join-room/?roomId=${formData.roomId}`}
              />
            </>
          }
        />
      </div>
    </>
  );
}

export default CreateRoom;
