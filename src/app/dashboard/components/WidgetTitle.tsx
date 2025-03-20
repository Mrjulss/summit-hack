import React, { ReactNode } from 'react';

interface WidgetTitleProps {
    children: ReactNode; // Accepts any valid React node as children
}

export function WidgetTitle({ children }: WidgetTitleProps) {
    return (
        <div className="flex flex-row items-center gap-4 text-[#DE3919] text-3xl mt-1" style={{ fontFamily: 'monospace' }}>
            {children}
        </div>
    );
}