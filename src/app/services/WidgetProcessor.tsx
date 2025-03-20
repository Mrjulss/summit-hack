import { JSX } from "react";
import { Widget } from "../dashboard/components/Widget";
import { WidgetType } from "../dashboard/types/widgetTypes";

class WidgetProcessor {
  constructor() {}

  public responseToWidgets(response: any): JSX.Element[] {
    const widgetList: JSX.Element[] = [];

    for (const item of response) {
      // Ensure item has 'type' and 'content' before processing
      if (item?.type && item?.content) {
        const widget = this.getWidget(item);
        if (widget) widgetList.push(widget);
      } else {
        console.warn("Invalid item format:", item);
      }
    }

    return widgetList;
  }

  private getWidget(item: { type: WidgetType; content: any }): JSX.Element | null {
    // Process item based on its type
    return <Widget type={item.type} content={item.content}/>
  }
}

export default new WidgetProcessor();
