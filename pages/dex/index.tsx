import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, Time, IChartApi, ISeriesApi, CandlestickData } from 'lightweight-charts';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
import { LIQUIDBOOK_GRAPHQL_URL } from '@/constants/subgraph-url';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: LIQUIDBOOK_GRAPHQL_URL, 
  cache: new InMemoryCache(),
});

export const SET_CURRENT_TICK_EVENTS = gql`
  query setCurrentTickEvents {
    setCurrentTick(orderBy: timestamp, orderDirection: desc) {
      id
      tick
      timestamp
    }
  }
`;

interface TickEvent {
  id: string;
  tick: string;
  timestamp: string;
}

// Chart component that uses Apollo Client
function ChartComponent() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { loading, error, data } = useQuery(SET_CURRENT_TICK_EVENTS, {
    pollInterval: 5000,
  });

  const processTickData = (tickEvents: TickEvent[]): CandlestickData<Time>[] => {
    return tickEvents.map((event) => {
      const timestamp = parseInt(event.timestamp);
      const tickValue = parseFloat(event.tick);
      
      return {
        time: timestamp as Time,
        open: tickValue,
        high: tickValue,
        low: tickValue,
        close: tickValue,
      };
    });
  };

  useEffect(() => {
    if (!chartContainerRef.current || loading) return;

    const chart: IChartApi = createChart(chartContainerRef.current, {
      layout: {
        textColor: 'rgba(255, 255, 255, 0.9)',
        background: { type: ColorType.Solid, color: '#151924' },
      },
      grid: {
        vertLines: { color: 'rgba(42, 46, 57, 0.6)' },
        horzLines: { color: 'rgba(42, 46, 57, 0.6)' },
      },
      timeScale: {
        borderColor: 'rgba(42, 46, 57, 0.6)',
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: '#758696',
          width: 1,
          style: 3,
          labelBackgroundColor: '#758696',
        },
        horzLine: {
          color: '#758696',
          width: 1,
          style: 3,
          labelBackgroundColor: '#758696',
        },
      },
      height: 600
    });

    const candlestickSeries: ISeriesApi<'Candlestick'> = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    if (data?.setCurrentTick) {
      const chartData = processTickData(data.setCurrentTick);
      candlestickSeries.setData(chartData);
      chart.timeScale().fitContent();
    }

    const handleResize = () => {
      chart.applyOptions({ 
        height: chartContainerRef.current?.clientHeight || 600,
        width: chartContainerRef.current?.clientWidth || 800
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, loading]);

  if (loading) {
    return <div className="w-full h-screen bg-[#151924] text-white flex items-center justify-center">
      Loading...
    </div>;
  }

  if (error) {
    return <div className="w-full h-screen bg-[#151924] text-white flex items-center justify-center">
      Error: {error.message}
    </div>;
  }

  return (
    <div className="w-full h-screen bg-[#151924] text-white">
      <div className="w-full p-4">
        <div ref={chartContainerRef} className="w-full h-[600px]" />
      </div>
    </div>
  );
}

// Main component wrapped with ApolloProvider
function Dex() {
  return (
    <ApolloProvider client={client}>
      <ChartComponent />
    </ApolloProvider>
  );
}

export default Dex;