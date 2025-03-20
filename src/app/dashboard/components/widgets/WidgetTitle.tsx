import React, { ReactNode } from 'react';

interface WidgetTitleProps {
    children: ReactNode;
    fontSize?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'; // Predefined size options
}

export function WidgetTitle({ children, fontSize = '2xl' }: WidgetTitleProps) {
    // Map size options to Tailwind classes
    const sizeClasses = {
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl'
    };

    return (
        <div className={`flex flex-row items-center gap-4 text-[#DE3919] ${sizeClasses[fontSize]} mt-1`} 
             style={{ fontFamily: 'monospace' }}>
            {children}
        </div>
    );
}