import React, { ReactNode } from 'react';

interface WidgetTitleProps {
    children: ReactNode; // Accepts any valid React node as children
}

export function WidgetFrame({ children }: WidgetTitleProps) {
    return (
        <div className="w-[350px] h-[350px] bg-white rounded-lg shadow-md p-5 flex flex-col gap-4 m-2">
            {/* Render the children as the title */}
            {children}
        </div>
    );
}