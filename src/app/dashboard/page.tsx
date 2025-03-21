'use client'

import React, { JSX, useEffect, useState } from "react";
import WidgetProcessor from "../services/WidgetProcessor";
import Searchbar from "../components/searchbar";
import { ApiClient } from "../services/ApiClient";
import { useSearchParams, useRouter } from 'next/navigation';

const Dashboard = () => {
    const [widgets, setWidgets] = useState<JSX.Element[]>([]);
    const searchParams = useSearchParams();
    const client = new ApiClient('http://localhost:8000');

    const query = searchParams.get('query');
    const userId = searchParams.get('userId');

    useEffect(() => {
        client.post("/prompt", {
            query,
            user_id: userId
        }).then(response => {
            const widgetElements = WidgetProcessor.responseToWidgets(response);
            setWidgets(widgetElements);
        }).catch(e => {
            console.log(e);
        });
    }, [query, userId]);

    // Create a unique key based on the query parameters to force remount on change
    const key = `${query || ''}-${userId || ''}`;

    return (
        <div key={key} className="h-screen flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 auto-rows-min">
                {widgets.length > 0 ? (
                    widgets.slice(0, 8).map((widget, index) => (
                        <div key={index} className="h-full">
                            {widget}
                        </div>
                    ))
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#DE3919]"></div>
                    </div>
                )}
            </div>
            <div className="sticky bottom-0 p-1 backdrop-blur-sm bg-white border-t border-gray-100">
                <Searchbar userDropdownPosition="top" />
            </div>
        </div>
    );
};

export default Dashboard;
