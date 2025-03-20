import React, { ReactNode } from 'react';

interface WidgetFrameProps {
    children: ReactNode;
    size?: 'default' | 'small';
    className?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export function WidgetFrame({ 
    children, 
    size = 'default',
    className = '',
    onMouseEnter,
    onMouseLeave 
}: WidgetFrameProps) {
    const baseStyles = 'bg-white rounded-lg shadow-md flex flex-col m-0.5 border border-[#002C5F]';
    
    const sizeStyles = {
        default: 'w-[320px] h-[300px] p-4 gap-4',
        small: 'w-[150px] h-[150px] p-3 gap-2'
    };

    return (
        <div 
            className={`${baseStyles} ${sizeStyles[size]} ${className}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </div>
    );
}