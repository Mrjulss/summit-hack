'use client'

import React, { JSX, useEffect, useState } from "react";
import WidgetProcessor from "../services/WidgetProcessor";
import Searchbar from "../components/searchbar";
import { ApiClient } from "../services/ApiClient";
import { useSearchParams } from 'next/navigation'
import response from './response.json'; // Import local JSON file


const Dashboard = () => {
    const [widgets, setWidgets] = useState<JSX.Element[]>([]);
    const searchParams = useSearchParams()     
    const client = new ApiClient('http://localhost:8000');

    useEffect(() => {
        let widgetElements = WidgetProcessor.responseToWidgets(response);
        setWidgets(widgetElements)
        /*client.post("/prompt", {
            "query": searchParams.get('query'),
            "user_id": searchParams.get('userId')
        }).then( response => {
            let widgetElements = WidgetProcessor.responseToWidgets(response);
            setWidgets(widgetElements); 
        }).catch( e => {
            console.log(e)
        })*/

    }, [searchParams]);

    return (
        <div className="h-screen flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 auto-rows-min">
                {widgets.length > 0 ? (
                    widgets.slice(0, 8).map((widget, index) => (
                        <div key={index} className="h-full">
                            {widget}
                        </div>
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </div>

            <div className="sticky bottom-0 p-1 backdrop-blur-sm bg-white border-t border-gray-100">
                <Searchbar userDropdownPosition="top"/>
            </div>
        </div>
    );
};

export default Dashboard;
