'use client';

import React, { useEffect, useRef, memo } from 'react';

const TradingViewWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "OKX:ETHUSDC",
      interval: "5",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      hide_side_toolbar: false,
      allow_symbol_change: true,
    //   backgroundColor: "#0E0E0E",
    //   gridColor: "#1E1E1E",
      calendar: false,
      hide_volume: false,
    //   toolbar_bg: "#0E0E0E",
    //   support_host: "https://www.tradingview.com",
      disabled_features: [
        "header_symbol_search",
        "header_settings",
        "header_chart_type",
        "header_compare",
        "header_undo_redo",
        "timeframes_toolbar",
        "volume_force_overlay"
      ],
      enabled_features: [
        "hide_left_toolbar_by_default",
        "create_volume_indicator_by_default",
        "volume_force_overlay"
      ],
    });

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        const scriptElement = containerRef.current.querySelector('script');
        if (scriptElement) {
          scriptElement.remove();
        }
      }
    };
  }, []);

  return (
    <div 
      id="tradingview_chart" 
      ref={containerRef} 
      className="w-full h-[502px] bg-[#0E0E0E]"
    />
  );
};

export default memo(TradingViewWidget);