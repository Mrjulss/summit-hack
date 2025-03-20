import React from 'react';
import { LineChart } from '@mui/x-charts';
import { Itim } from 'next/font/google';
import { WidgetFrame } from '../WidgetFrame';
import { WidgetTitle } from '../WidgetTitle';

interface Timeseries {
    timestamps: number[];
    values: number[];
}

interface TimeseriesWidgetProps {
    data: Timeseries[];
    title: string;
}

export function TimeseriesWidget({ data, title }: TimeseriesWidgetProps) {
    // Validate all timeseries entries
    if (
        data.length === 0 ||
        !data.every(item => 
            Array.isArray(item.timestamps) && 
            Array.isArray(item.values)
        )
    ) {
        return <div>Invalid data</div>;
    }

    // Assuming all timeseries share the same timestamps
    const xAxisData = data[0].timestamps.map(t => new Date(t * 1000));

    return (
        <WidgetFrame>
            <WidgetTitle>
                {title}
            </WidgetTitle>
            <div className='items-center'>
            <LineChart
                xAxis={[{ 
                    data: xAxisData,
                    scaleType: 'time' 
                }]}
                series={data.map((series, index) => ({
                    data: series.values,
                    label: `Series ${index + 1}`,
                }))}
                width={350}
                height={200}
                colors={['#DE3919']} // Single color for all series
            
            />
            </div>
        </WidgetFrame>
    );
}