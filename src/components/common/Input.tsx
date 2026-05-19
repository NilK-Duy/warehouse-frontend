import { type InputHTMLAttributes } from 'react';

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500'
      {...props}
    />
  );
};

export default Input;
