import { forwardRef, ComponentPropsWithRef, Ref } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = Omit<ComponentPropsWithRef<'input'>, 'ref'> &
  Omit<ComponentPropsWithRef<'textarea'>, 'ref'> & {
    variant?: 'default' | 'error';
    isMultiline?: boolean;
    rows?: number;
  };

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(function Input(
  { className, variant = 'default', disabled = false, isMultiline = false, rows = 1, ...rest },
  ref,
) {
  const baseStyle =
    'w-[86.6rem] rounded-[0.8rem] border p-[1.2rem] text-[1.8rem] font-medium outline-none placeholder:text-gray-light';
  const focusedStyle =
    'hover:border-neutral-10 hover:bg-purple-light hover:text-[#3f3f3f] focus:border-primary-500 focus:text-[#3f3f3f]';
  const variantStyles = {
    default: 'border-neutral-10 text-gray-dark',
    error: 'border-system-warning bg-red-light text-[#3f3f3f]',
  };
  const disabledStyles = 'cursor-not-allowed bg-gray-light placeholder:text-[#d6d6d6]';

  const combinedClasses = twMerge(
    baseStyle,
    variantStyles[variant],
    disabled ? disabledStyles : focusedStyle,
    className,
  );

  if (isMultiline) {
    return (
      <textarea
        ref={ref as Ref<HTMLTextAreaElement>}
        className={twMerge(combinedClasses, 'resize-none')}
        disabled={disabled}
        rows={rows}
        {...rest}
      />
    );
  }

  return (
    <input
      ref={ref as Ref<HTMLInputElement>}
      className={combinedClasses}
      disabled={disabled}
      {...rest}
    />
  );
});

Input.displayName = 'Input';

export default Input;
