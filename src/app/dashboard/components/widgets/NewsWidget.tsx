import React from "react";

interface Headline {
  headline: string;
  url: string;
}

interface NewsWidgetProps {
  headlines: Headline[];
}

export function NewsWidget({ headlines = [] }: NewsWidgetProps) {
  return (
    <div>
      <div>News</div>
      <div className="flex flex-col gap-2">  {/* Wrapper for news items */}
        {headlines.map((item, index) => (
          <div key={index} className="flex flex-row gap-2 p-4 border-b">
            <h3 className="text-xl font-bold">{item.headline}</h3>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

