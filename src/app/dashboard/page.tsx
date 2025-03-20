'use client'

import React, { JSX, useEffect, useState } from "react";
import WidgetProcessor from "../services/WidgetProcessor";
import Searchbar from "../components/searchbar";

const Dashboard = () => {
    const [widgets, setWidgets] = useState<JSX.Element[]>([]);
    const [isExpanded, setExpanded] = useState<Boolean>();
    
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
                    risk_aversion: 3,
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
            },
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
                      risk_aversion: 3,
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
              },
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
                      risk_aversion: 3,
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

    console.log(widgets)
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
                <Searchbar/>
            </div>
        </div>
    );
};

export default Dashboard;
