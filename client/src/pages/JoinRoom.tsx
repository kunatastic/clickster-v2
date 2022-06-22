import React, { useEffect, useState } from 'react';
import SubmitButton from '../components/SubmitButton';
import Input from '../components/Input';
import Nav from '../components/Nav';
import { useNavigate } from 'react-router-dom';
import { CLICKSTER_USER_KEY } from '../config';

interface JoinRoomType {
  roomId: string;
  userName: string;
}

function JoinRoom() {
  const [formData, setFormData] = useState<JoinRoomType>({
    userName: 'kunal',
    roomId: 'test-room-123',
  });
  // const socketInfo = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFormData(state => ({ ...state, roomId: params.get('roomId') || state.roomId }));
  }, []);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log(formData);
    localStorage.setItem(CLICKSTER_USER_KEY, formData.userName);
    if (localStorage.getItem(CLICKSTER_USER_KEY) === formData.userName) {
      navigate(`/playground/${formData.roomId}`);
    }
  }

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
            <h1 className="text-4xl font-bold text-gray-100 text-center py-2">
              Join a room to play
            </h1>
            <div className="w-full flex flex-col justify-center items-center">
              <Input
                type="text"
                value={formData.userName}
                onChange={e => setFormData({ ...formData, userName: e.target.value })}
                placeholder="Username"
              />
              <Input
                type="text"
                value={formData.roomId}
                onChange={e => setFormData({ ...formData, roomId: e.target.value })}
                placeholder="Room ID"
              />
              <SubmitButton text="Join room" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default JoinRoom;
