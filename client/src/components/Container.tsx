import React from 'react';
import backgroundImage from '../assets/bg.webp';

interface ContainerProps {
  children: React.ReactNode;
}

function Container(props: ContainerProps) {
  return (
    <div
      className="overflow-hidden h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 1,
      }}
    >
      <div className="flex flex-col h-full">{props.children}</div>
    </div>
  );
}

export default Container;
