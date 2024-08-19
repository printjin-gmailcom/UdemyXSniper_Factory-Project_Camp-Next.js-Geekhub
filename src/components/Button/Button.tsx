'use client';

import { twMerge } from 'tailwind-merge';
import { ComponentPropsWithoutRef } from 'react';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: 'filled' | 'outlined' | 'tonal';
  shape?: 'rectangle' | 'rounded';
  size?: 'small' | 'default' | 'large';
};

export default function Button({
  className,
  children,
  type = 'button',
  variant = 'filled',
  shape = 'rounded',
  size = 'default',
  disabled,
  ...rest
}: ButtonProps) {
  const baseStyle = 'flex items-center justify-center outline-none';

  const variantEnabledStyles = {
    filled: 'bg-primary-500 text-white',
    outlined: 'text-primary-500 border-primary-200 border-[0.1rem]',
    tonal: 'bg-primary-50 text-primary-500',
  };

  const variantDisabledStyles = {
    filled: 'bg-gray-light text-gray-default',
    outlined: 'bg-gray-light text-gray-default border-[#c3c3c3] border-[0.1rem]',
    tonal: 'bg-purple-light text-primary-100',
  };

  const shapeStyles = {
    rounded: 'rounded-full',
    rectangle: 'rounded-[0.8rem]',
  };

  const sizeStyles = {
    small: 'w-[10.1rem] h-[4rem] px-[2rem] py-[0.8rem] text-[2rem] font-[300]',
    default: 'w-[12.1rem] h-[5.6rem] px-[2.4rem] py-[1.6rem] text-[2.4rem] font-[300]',
    large: 'w-[19.6rem] h-[5.6rem] px-[2rem] py-[1.6rem] text-[2.4rem] font-bold',
  };

  const interactionStyles = {
    filled: 'hover:shadow-button',
    outlined:
      'hover:bg-[rgba(97,0,255,0.08)] hover:shadow-button focus:bg-[rgba(97,0,255,0.12)] focus:border-primary-500 active:bg-[rgba(97, 0, 255, 0.12)] active:border-primary-200',
    tonal:
      'hover:bg-[rgba(0,0,0,0.08)] hover:shadow-button focus:bg-[rgba(0,0,0,0.12)] active:bg-[rgba(0,0,0,0.12)]',
  };

  const combinedClasses = twMerge(
    baseStyle,
    shapeStyles[shape],
    sizeStyles[size],
    disabled ? variantDisabledStyles[variant] : variantEnabledStyles[variant],
    !disabled && interactionStyles[variant],
    className,
  );

  return (
    <button
      className={combinedClasses}
      type={type === 'submit' ? 'submit' : 'button'}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}