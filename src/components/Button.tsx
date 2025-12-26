import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-tapoutsPurple text-white hover:bg-opacity-90 focus:ring-tapoutsPurple",
    secondary: "bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-800",
    outline: "border-2 border-tapoutsPurple text-tapoutsPurple hover:bg-tapoutsPurple hover:text-white focus:ring-tapoutsPurple",
    gold: "bg-nexusGold text-white hover:bg-opacity-90 focus:ring-nexusGold",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
