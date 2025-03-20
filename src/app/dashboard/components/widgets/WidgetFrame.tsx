import React, { ReactNode } from 'react';

interface WidgetTitleProps {
    children: ReactNode; // Accepts any valid React node as children
}

export function WidgetFrame({ children }: WidgetTitleProps) {
    return (
        <div className="w-[320px] h-[300px] bg-white rounded-lg shadow-md p-4 flex flex-col gap-4 m-0.5 border-1 b-[#002C5F]">
            {/* Render the children as the title */}
            {children}
        </div>
    );
}