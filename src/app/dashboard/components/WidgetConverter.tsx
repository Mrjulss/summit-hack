import { WidgetType } from "../types/widgetTypes";
import { CustomerWidget } from "./widgets/CustomerWidget";
import { KpiWidget } from "./widgets/KpiWidget";
import { NewsWidget } from "./widgets/NewsWidget";
import { TimeseriesWidget } from "./widgets/TimeseriesWidget";

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
        return <KpiWidget {...props} />;
      case "timeseries":
        return <TimeseriesWidget data={content.data} title={content.title} {...props} />;
      default:
        return <div {...props}>Unknown Widget</div>;
    }
  }