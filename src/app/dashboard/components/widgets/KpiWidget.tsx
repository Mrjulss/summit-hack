import { KpiType } from "../../types/kpiTypes";
import { WidgetFrame } from "./WidgetFrame";
import { WidgetTitle } from "./WidgetTitle";
import { FiActivity } from "react-icons/fi";

export function KpiWidget(kpi: KpiType) {
    return (
        <WidgetFrame>
            {/* Header with Icon and Title */}
            <div className="flex items-center gap-3">
                <FiActivity className="w-5 h-5 text-[#DE3919]" />
                <WidgetTitle>
                    {kpi.title}
                </WidgetTitle>
            </div>

            {/* Centered Value Section */}
            <div className="flex flex-col items-center justify-center flex-1 gap-2">
                {/* Main Value */}
                <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-[#002C5F]">
                        {kpi.value}
                    </span>
                    <span className="text-2xl font-medium text-[#002C5F]">
                        {kpi.unit}
                    </span>
                </div>

                {/* Company */}
                <div className="text-2xl font-mono text-[#002C5F]">
                    {kpi.company}
                </div>
            </div>
        </WidgetFrame>
    );
}