'use client'

import React, { JSX, useEffect, useState, useRef } from "react";
import WidgetProcessor from "../services/WidgetProcessor";
import Searchbar from "../components/searchbar";
import { useSearchParams } from 'next/navigation';
import response from './response.json';
import response2 from './response2.json';

const Dashboard = () => {
    const [widgets, setWidgets] = useState<JSX.Element[]>([]);
    const [loading, setLoading] = useState(true);
    const runCountRef = useRef(0);
    const searchParams = useSearchParams();

    const query = searchParams.get('query');
    const userId = searchParams.get('userId');

    useEffect(() => {
        setLoading(true);
        runCountRef.current += 1;
        
        const currentResponse = runCountRef.current % 2 === 0 ? response : response2;

        setTimeout(() => {
            const widgetElements = WidgetProcessor.responseToWidgets(currentResponse);
            setWidgets(widgetElements);
            setLoading(false);
        }, 800); // Simulate 1-second loading delay

    }, [query, userId]);

    const key = `${query || ''}-${userId || ''}-${runCountRef.current}`;

    return (
        <div key={key} className="h-screen flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 auto-rows-min">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#DE3919]"></div>
                    </div>
                ) : (
                    widgets.length > 0 ? (
                        widgets.slice(0, 8).map((widget, index) => (
                            <div key={index} className="h-full">
                                {widget}
                            </div>
                        ))
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-gray-500">No widgets available</p>
                        </div>
                    )
                )}
            </div>
            <div className="sticky bottom-0 p-1 backdrop-blur-sm bg-white border-t border-gray-100">
                <Searchbar userDropdownPosition="top" />
            </div>
        </div>
    );
};

export default Dashboard;