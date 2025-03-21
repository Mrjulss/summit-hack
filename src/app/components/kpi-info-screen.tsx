import React from "react";
import { FiX } from "react-icons/fi";
import { BarChart } from "@mui/x-charts";
import { SmallKpiWidget } from "../dashboard/components/widgets/SmallKpiWidget";
import info from "./info.json";

interface KpiInfoScreenProps {
    onClose: () => void;
    company: string;
}

export default function KpiInfoScreen({ onClose, company }: KpiInfoScreenProps) {
    // Use the eps data from the JSON file for the BarChart
    const epsData = info.eps;
    // Sort the EPS data in descending order (by value)
    const sortedEpsData = React.useMemo(() => {
        return [...epsData].sort((a, b) => b.value - a.value);
    }, [epsData]);

    // Filter out KPI items (e.g., Dividend per share) for the selected company
    const kpiItems = info.kpis;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-4xl border border-[#002C5F] relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute hover:cursor-pointer top-4 right-4 text-[#DE3919] hover:text-[#BF2A1A] transition-colors"
                    aria-label="Close"
                >
                    <FiX className="w-6 h-6" />
                </button>

                <h2 className="text-3xl font-bold text-[#002C5F] mb-6">
                    {company} Financial Overview
                </h2>

                <div className="h-[70vh] overflow-y-auto pr-4">
                    {/* BarChart: Render sorted EPS data for all companies */}
                    <BarChart
                        dataset={sortedEpsData}
                        series={[
                            {
                                type: "bar",
                                dataKey: "value",
                                label: "EPS",
                            },
                        ]}
                        xAxis={[
                            {
                                scaleType: "band",
                                dataKey: "name",
                            },
                        ]}
                        yAxis={[
                            {
                                valueFormatter: (value) => value.toFixed(2),
                            },
                        ]}
                        width={800}
                        height={400}
                        slotProps={{
                            legend: { hidden: true },
                            bar: (params: any) => ({
                                fill: "#DE3919",
                                rx: 4,
                            }),
                        }}
                    />
                    {/* KPI Widgets: EPS for the selected company and other KPIs */}
                    <div className="flex flex-row justify-around items-center mt-6">
                        {kpiItems.map(
                            (kpi: { title: string; value: number; unit: string, company: string }, index: React.Key | null | undefined) => (
                                <SmallKpiWidget
                                    key={index}
                                    title={kpi.title}
                                    value={kpi.value}
                                    unit={kpi.unit}
                                    company={kpi.company}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
