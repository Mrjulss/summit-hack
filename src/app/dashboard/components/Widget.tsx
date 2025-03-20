import { WidgetType } from "../types/widgetTypes";
import { BenchmarkWidget } from "./widgets/BenchmarkWidget";
import { CustomerWidget } from "./widgets/CustomerWidget";
import { KpiWidget } from "./widgets/KpiWidget";
import { NewsWidget } from "./widgets/NewsWidget";
import { PortfolioWidget } from "./widgets/PortfolioWidget";
import { TimeseriesWidget } from "./widgets/TimeseriesWidget";

interface WidgetProps {
    type: WidgetType;
    content: any;
    [key: string]: any;
}

export function Widget({ type, content, ...props }: WidgetProps) {
    switch (type) {
      case "customer":
        return <CustomerWidget {...props} />;
      case "news":
        return <NewsWidget headlines={content.headlines} {...props}/>;
      case "kpi":
        return <KpiWidget {...props} />;
      case "benchmark":
        return <BenchmarkWidget {...props} />;
      case "portfolio":
        return <PortfolioWidget {...props} />;
      case "timeseries":
        return <TimeseriesWidget data={content.data} title={content.data} {...props} />;
      default:
        return <div {...props}>Unknown Widget</div>;
    }
  }