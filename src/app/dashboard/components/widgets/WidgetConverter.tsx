import { WidgetType } from "../../types/widgetTypes";
import { CustomerWidget } from "./CustomerWidget";
import { KpiWidget } from "./KpiWidget";
import { NewsWidget } from "./NewsWidget";
import { SmallKpiWidget } from "./SmallKpiWidget";
import { TimeseriesWidget } from "./TimeseriesWidget";

interface WidgetProps {
    type: WidgetType;
    content: any;
    [key: string]: any;
}

export function WidgetConverter({ type, content, ...props }: WidgetProps) {
    switch (type) {
      case "customer":
        return <CustomerWidget {...content} {...props} />;
      case "news":
        return <NewsWidget headlines={content.headlines} {...props}/>;
      case "kpi":
        return <KpiWidget {...content} {...props} />;
      case "timeseries":
        return <TimeseriesWidget data={content.data} title={content.title} {...props} />;
      case "small-kpi":
        return <SmallKpiWidget {...content} {...props} />;
      default:
        return <div {...props}>Unknown Widget</div>;
    }
  }