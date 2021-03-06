import React from 'react';

interface ButtonProps {
  text: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: (event: React.FormEvent) => void;
}

function Button(props: ButtonProps) {
  return (
    <button
      className="bg-orange-500 hover:bg-orange-700 text-white font-bold mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type={props.type}
      onClick={props?.onClick}
    >
      {props.text}
    </button>
  );
}

export default Button;
