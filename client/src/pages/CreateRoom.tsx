import React, {useState} from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Nav from '../components/Nav';

function CreateRoom() {
  const [formData, setFormData] = useState<{roomId: string; roomName: string}>({
    roomId: '',
    roomName: '',
  });

  return (
    <>
      <Nav />
      <div className="flex justify-center h-full items-center">
        <div
          className="bg-black bg-opacity-50 rounded-xl shadow-2xl border-2 border-orange-500"
          style={{backdropFilter: 'blur(4px)'}}
        >
          <form className="flex flex-col justify-center items-center py-12 px-10">
            <h1 className="text-4xl font-bold text-gray-100 text-center py-2">Create a new room</h1>
            <div className="w-full flex flex-col justify-center items-center">
              <Input
                type="text"
                value={formData.roomName}
                onChange={e => setFormData({...formData, roomName: e.target.value})}
                placeholder="Room Name"
              />
              <Input
                type="text"
                value={formData.roomId}
                onChange={e => setFormData({...formData, roomId: e.target.value})}
                placeholder="Room ID"
              />
              <Button text="Create room" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateRoom;
