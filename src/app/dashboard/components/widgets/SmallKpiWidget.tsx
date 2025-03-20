import { KpiType } from "../../types/kpiTypes";
import { WidgetFrame } from "./WidgetFrame";
import { WidgetTitle } from "./WidgetTitle";
import { FiActivity } from "react-icons/fi";

export function SmallKpiWidget(kpi: KpiType) {
    const formatValue = (value: string | number) => {
        if (typeof value === 'string') return value;
        
        // Compact number formatting
        return Intl.NumberFormat('en', { 
            notation: value > 10_000 ? 'compact' : 'standard'
        }).format(value);
    };

    return (
        <WidgetFrame size="small">
            <div className="flex items-center gap-2">
                <FiActivity className="w-4 h-4 text-[#DE3919]" />
                <WidgetTitle fontSize="sm">
                    {kpi.title}
                </WidgetTitle>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 gap-1">
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-[#002C5F] break-all">
                        {formatValue(kpi.value)}
                    </span>
                    {kpi.unit && (
                        <span className="text-lg text-[#002C5F]/80">
                            {kpi.unit}
                        </span>
                    )}
                </div>
                
                {kpi.company && (
                    <div className="text-sm text-[#002C5F]/80 text-center">
                        {kpi.company}
                    </div>
                )}
            </div>
        </WidgetFrame>
    );
}