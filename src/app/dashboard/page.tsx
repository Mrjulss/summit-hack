'use client'

import React, { JSX, useEffect, useState } from "react";
import WidgetProcessor from "../services/WidgetProcessor";

const MyComponent = () => {
    const [widgets, setWidgets] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const response = [
            {
              type: "news",
              content: {
                headlines: [
                  { headline: "Breaking News", url: "https://news.com" },
                  { headline: "Tech Update", url: "https://tech.com" },
                ],
              },
            },
            {
              type: "timeseries",
              content: {
                title: "Portfolio Performance",
                data: [
                  {
                    timestamps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    values: [100, 102, 105, 107, 105, 103, 100, 106, 108, 110],
                  },
                ],
              },
            },
            {
                type: "customer",
                content: {
                    name: "John Doe",
                    age: 34,
                    risk_aversity: 3,
                    location: "DE",
                    profession: "Sports Club Owner",
                    source_of_wealth: "self earned"
                }
            },
            {
                type: "kpi",
                content: {
                    company: "Nvidia",
                    title: "Market Cap",
                    value: 10000000,
                    unit: "%"
                }
            }
          ];

        // Process the response to generate the widgets
        const widgetElements = WidgetProcessor.responseToWidgets(response);
        setWidgets(widgetElements); 
    }, []);

    return (
        <div>
            {widgets.length > 0 ? (
                widgets.map((widget, index) => <div key={index}>{widget}</div>)
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default MyComponent;