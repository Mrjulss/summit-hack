import { BenchmarkWidget } from "./widgets/BenchmarkWidget";
import { CustomerWidget } from "./widgets/CustomerWidget";
import { KpiWidget } from "./widgets/KpiWidget";
import { NewsWidget } from "./widgets/NewsWidget";
import { PortfolioWidget } from "./widgets/PortfolioWidget";

interface WidgetProps {
    type: "customer" | "news" | "kpi" | "portfolio" | "benchmark";
    [key: string]: any;
}

export function Widget({ type, ...props }: WidgetProps) {
    switch (type) {
      case "customer":
        return <CustomerWidget {...props} />;
      case "news":
        return <NewsWidget {...props}/>;
      case "kpi":
        return <KpiWidget {...props} />;
      case "benchmark":
        return <BenchmarkWidget {...props} />;
      case "portfolio":
        return <PortfolioWidget {...props} />;
      default:
        return <div {...props}>Unknown Widget</div>;
    }
  }