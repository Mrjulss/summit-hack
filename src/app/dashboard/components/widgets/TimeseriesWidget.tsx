import React from 'react';
import { LineChart } from '@mui/x-charts';

interface Timeseries {
    timestamps: number[];
    values: number[];
}

interface TimeseriesWidgetProps {
    data: Timeseries[];
    title: string;
}

export function TimeseriesWidget({ data, title }: TimeseriesWidgetProps) {
    console.log(data); 
    if(
        !Array.isArray(data[0].timestamps) ||
        !Array.isArray(data[0].values)
    ) {
        return <div>Invalid data</div>;
    }

    return (
        <div>
            <h1>{title}</h1>
            <LineChart
                xAxis={[{ data: data[0].timestamps.map((timestamp) => new Date(timestamp * 1000)) }]}
                series={[{ data: data[0].values }]}
                width={500}
                height={300}
            >
            </LineChart>
        </div>
    );
}