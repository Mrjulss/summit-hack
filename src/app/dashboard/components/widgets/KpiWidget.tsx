'use client'
import { KpiType } from "../../types/kpiTypes";
import { WidgetFrame } from "./WidgetFrame";
import { WidgetTitle } from "./WidgetTitle";
import { FiActivity, FiMaximize } from "react-icons/fi";
import { useState } from 'react';
import KpiInfoScreen from "@/app/components/kpi-info-screen";

export function KpiWidget(kpi: KpiType) {
    const [isHovered, setIsHovered] = useState(false);
    const [showInfoScreen, setShowInfoScreen] = useState(false);

    const formatValue = (value: string | number) => {
        if (typeof value === 'string') return value;
        return value.toLocaleString();
    };

    return (
        <>
            <WidgetFrame
                className="relative hover:shadow-lg transition-all"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Expand icon */}
                {isHovered && (
                    <button
                        onClick={() => setShowInfoScreen(true)}
                        className="absolute top-2 right-2 p-1.5 text-[#DE3919] hover:text-[#BF2A1A] transition-colors hover:cursor-pointer"
                        aria-label="Expand widget"
                    >
                        <FiMaximize className="w-4 h-4" />
                    </button>
                )}

                {/* Widget Content */}
                <div className="flex items-center gap-3">
                    <FiActivity className="w-5 h-5 text-[#DE3919]" />
                    <WidgetTitle fontSize="xl">
                        {kpi.title}
                    </WidgetTitle>
                </div>
                <div className="flex flex-col items-center justify-center flex-1 gap-2">
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-[#002C5F] break-all">
                            {formatValue(kpi.value)}
                        </span>
                        <span className="text-2xl font-medium text-[#002C5F]">
                            {kpi.unit}
                        </span>
                    </div>
                    <div className="text-2xl font-mono text-[#002C5F]">
                        {kpi.company}
                    </div>
                </div>
            </WidgetFrame>

            {/* Info Screen Modal */}
            {showInfoScreen && (
                <KpiInfoScreen 
                    onClose={() => setShowInfoScreen(false)}
                    company={kpi.company}
                />
            )}
        </>
    );
}