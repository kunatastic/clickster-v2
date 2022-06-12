import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Nav() {
  const NavLinks = [
    { href: '/', text: 'Home' },
    { href: '/join-room', text: 'Join Room' },
    { href: '/create-room', text: 'Create Room' },
  ];
  const location = useLocation();

  return (
    <div className="absolute top-0 left-0 w-full h-10 bg-black bg-opacity-40 text-gray-200 px-48 backdrop-blur-sm">
      <ul className="flex w-full justify-between items-center h-full">
        {NavLinks.map(({ href, text }) => (
          <li
            key={href}
            className={`${
              location.pathname === href ? 'text-orange-400' : ''
            } hover:text-orange-600`}
          >
            <Link to={href}>{text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Nav;
