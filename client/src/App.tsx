import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from './components/Container';
import SocketContextProvider from './context/SocketProvider';
import CreateRoom from './pages/CreateRoom';
import Game from './pages/Game';
import Home from './pages/Home';
import JoinRoom from './pages/JoinRoom';

function App() {
  return (
    <>
      <BrowserRouter>
        <SocketContextProvider>
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-room" element={<CreateRoom />} />
              <Route path="/join-room" element={<JoinRoom />} />
              <Route path="/playground/:roomId" element={<Game />} />
            </Routes>
          </Container>
        </SocketContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
