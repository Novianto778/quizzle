import React from 'react';
import { cn } from '../lib/utils';
import { Slot } from '@radix-ui/react-slot';

type ButtonProps = {
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary' | 'outlined';
    asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
    children,
    className,
    variant = 'primary',
    asChild = false,
    ...props
}: ButtonProps) => {
    const baseClass =
        'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2';
    const Comp = asChild ? Slot : 'button';
    return (
        <Comp
            className={cn(
                baseClass,
                variant === 'primary' && 'bg-primary text-white',
                variant === 'secondary' && 'bg-secondary text-gray-900',
                variant === 'outlined' &&
                    'bg-transparent border-2 border-primary text-primary',
                className
            )}
            {...props}
        >
            {children}
        </Comp>
    );
};

export default Button;
