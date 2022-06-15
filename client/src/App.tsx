import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Container from './components/Container';
import SocketContextProvider from './context/SocketProvider';
import CreateRoom from './pages/CreateRoom';
import Game from './pages/Game';
import Home from './pages/Home';
import JoinRoom from './pages/JoinRoom';

import 'react-toastify/dist/ReactToastify.css';

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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </>
  );
}

export default App;
