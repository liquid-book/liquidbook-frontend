import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, Time, IChartApi, ISeriesApi, CandlestickData } from 'lightweight-charts';
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { LIQUIDBOOK_GRAPHQL_URL } from '@/constants/subgraph-url';
import { TickEvent, TickEventResponse } from '@/types/web3/liquidbook/setCurrentTicks';
import { setCurrentTickEventss } from '@/graphql/liquidbook/liquidbook.query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

function processTickData(data: TickEvent[]): CandlestickData<Time>[] {
    const candlesticks: CandlestickData<Time>[] = [];
    
    for (let i = 0; i < data.length; i++) {
        const currentValue = parseFloat(data[i].tick);
        let open, high, low, close;
        
        if (i === 0) {
            open = currentValue;
            high = currentValue;
            low = currentValue;
            close = currentValue;
        } else {
            const previousValue = parseFloat(data[i - 1].tick);
            open = previousValue;
            close = currentValue;
            high = Math.max(open, close);
            low = Math.min(open, close);
        }

        candlesticks.push({
            time: data[i].timestamp as Time,
            open,
            high,
            low,
            close
        });
    }

    return candlesticks;
}

function ChartComponent() {
    const [queryClient] = useState(() => new QueryClient());
    const chartContainerRef = useRef<HTMLDivElement>(null);
    
    const { data, isLoading: loading, error } = useQuery<TickEventResponse>({
        queryKey: ['tickEvents'],
        queryFn: async () => {
            return await request(LIQUIDBOOK_GRAPHQL_URL, setCurrentTickEventss);
        },
        refetchInterval: 5000, // Poll every 5 seconds
        staleTime: 0,
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        if (!chartContainerRef.current || loading || !data) return;

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

        const series: ISeriesApi<'Candlestick'> = chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });

        if (data?.setCurrentTickEventss?.items) {
            const sortedItems = [...data.setCurrentTickEventss.items].sort(
                (a, b) => a.timestamp - b.timestamp
            );
            
            const chartData = processTickData(sortedItems);
            series.setData(chartData);
            chart.timeScale().fitContent();
            chart.timeScale().scrollToPosition(5, false);
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
        return (
            <div className="w-full h-screen bg-[#151924] text-white flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-screen bg-[#151924] text-white flex items-center justify-center">
                Error: {error.toString()}
            </div>
        );
    }

    return (
        <QueryClientProvider client={queryClient}>
        <div className="w-full h-screen bg-[#151924] text-white">
            <div className="w-full p-4">
                <div ref={chartContainerRef} className="w-full h-[600px]" />
            </div>
        </div>
        </QueryClientProvider>
    );
}

export default ChartComponent;