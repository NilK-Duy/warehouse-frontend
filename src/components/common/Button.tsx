import { type ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'secondary';
}

const Button = ({
  children,
  variant = 'primary',
  className,
  ...props
}: Props) => {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-lg font-medium transition-all',
        {
          'bg-blue-600 text-white hover:bg-blue-700':
            variant === 'primary',
          'bg-red-500 text-white hover:bg-red-600':
            variant === 'danger',
          'bg-slate-200 hover:bg-slate-300':
            variant === 'secondary',
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
