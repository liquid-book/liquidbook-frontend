import React, { useEffect, useRef } from 'react';

const TradingViewWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Store ref value in a variable for cleanup
    const container = containerRef.current;
    
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      container_id: "tradingview_chart",
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
      library_path: "/charting_library/",
    });

    container.appendChild(script);

    // Cleanup function uses the stored container reference
    return () => {
      const scriptElement = container.querySelector('script');
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, []);

  return (
    <div
      id="tradingview_chart"
      ref={containerRef}
      className="w-full h-[587px] bg-gray-900"
    />
  );
};

export default TradingViewWidget;