import React from 'react';
import { NavLink } from 'react-router-dom';

const Button = ({ variant = 'primary', children, onClick, className = '' }) => {
  const baseClasses = "font-body min-h-[48px] rounded-[var(--radius-btn)] transition-all duration-200 cursor-pointer px-6 py-2 w-max inline-flex items-center justify-center";
  
  const variants = {
    primary: "bg-cosmic-primary text-white hover:bg-cosmic-primary/90",
    primaryEnterprise: "bg-cosmic-accent text-white hover:bg-cosmic-accent/90",
    secondary: "border border-cosmic-primary text-cosmic-primary bg-transparent py-2.5",
    secondaryEnterprise: "border border-cosmic-accent text-cosmic-accent bg-transparent py-2.5",
    ghost: "bg-transparent text-white hover:underline hover:text-cosmic-primary px-0",
    ghostEnterprise: "bg-transparent text-white hover:underline hover:text-cosmic-accent px-0"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
