import React from "react";
import { WidgetFrame } from "./WidgetFrame";
import { WidgetTitle } from "./WidgetTitle";

interface Headline {
  headline: string;
  url: string;
}

interface NewsWidgetProps {
  headlines: Headline[];
}

export function NewsWidget({ headlines = [] }: NewsWidgetProps) {
  return (
    <WidgetFrame>
      <WidgetTitle>Relevant News</WidgetTitle>
      <div className="flex flex-col gap-4 p-4 h-[calc(100%-3rem)] overflow-y-auto">
        {headlines.map((item, index) => (
          <div
            key={index}
            className="flex flex-col bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900">{item.headline}</h3>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#002C5F] hover:text-blue-800 transition-colors text-sm mt-1"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </WidgetFrame>
  );
}

