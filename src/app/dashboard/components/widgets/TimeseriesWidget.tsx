import React from 'react';
import { LineChart } from '@mui/x-charts';
import { WidgetFrame } from './WidgetFrame';
import { WidgetTitle } from './WidgetTitle';

interface Timeseries {
    timestamps: string[];  // Changed to string type
    values: number[];
}

interface TimeseriesWidgetProps {
    data: Timeseries[];
    title: string;
}

export function TimeseriesWidget({ data, title }: TimeseriesWidgetProps) {
    // Validate and convert timestamps
    const parseTimestamps = (timestamps: string[]) => {
        return timestamps.map(t => new Date(t));
    };

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

    // Convert string timestamps to Date objects
    const processedData = data.map(series => ({
        timestamps: parseTimestamps(series.timestamps),
        values: series.values
    }));

    // Assuming all timeseries share the same timestamps
    const xAxisData = processedData[0].timestamps;

    return (
        <WidgetFrame>
            <WidgetTitle fontSize='xl'>
                {title}
            </WidgetTitle>
            <div className='items-center'>
                <LineChart
                    xAxis={[{ 
                        data: xAxisData,
                        scaleType: 'time',
                        valueFormatter: (date) => date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                        })
                    }]}
                    series={processedData.map((series, index) => ({
                        data: series.values,
                        label: title,
                    }))}
                    width={300}
                    height={200}
                    colors={['#DE3919']}
                />
            </div>
        </WidgetFrame>
    );
}