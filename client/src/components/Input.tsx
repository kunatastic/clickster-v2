import React from 'react';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'text' | 'password' | 'email' | 'number';
}

function Input(props: InputProps) {
  return (
    <input
      className="w-full my-2 bg-gray-100 appearance-none border-2 border-gray-200 rounded py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:border-orange-500"
      value={props?.value}
      onChange={props?.onChange}
      placeholder={props?.placeholder}
      type={props.type}
      spellCheck={false}
    />
  );
}

export default Input;
