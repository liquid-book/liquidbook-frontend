import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, Time, IChartApi, ISeriesApi, CandlestickData } from 'lightweight-charts';

interface TickEvent {
    id: string;
    tick: string;
    timestamp: number;
}

interface TickEventResponse {
    setCurrentTickEventss: {
        items: TickEvent[];
    }
}

function generateMockData(numPoints: number = 100): TickEventResponse {
    const baseTimestamp = 1735917196;
    const items: TickEvent[] = [];
    let previousTick = 100;

    for (let i = 0; i < numPoints; i++) {
        // Generate more volatile price movements
        const change = (Math.random() - 0.5) * 4; // Increased volatility
        const newTick = previousTick + change;
        previousTick = newTick;

        items.push({
            id: `0x${Math.random().toString(16).substr(2, 64)}`,
            tick: newTick.toFixed(2),
            timestamp: baseTimestamp + (i * 60)
        });
    }

    return {
        setCurrentTickEventss: {
            items
        }
    };
}

function processTickData(data: TickEvent[]): CandlestickData<Time>[] {
    const candlesticks: CandlestickData<Time>[] = [];
    
    for (let i = 0; i < data.length; i++) {
        const currentValue = parseFloat(data[i].tick);
        let open, high, low, close;
        
        if (i === 0) {
            // For the first tick, set all values to the same
            open = currentValue;
            high = currentValue;
            low = currentValue;
            close = currentValue;
        } else {
            const previousValue = parseFloat(data[i - 1].tick);
            // Set open to previous close
            open = previousValue;
            close = currentValue;
            // Set high and low based on direction
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

function* getNextRealtimeUpdate(data: TickEvent[]): Generator<CandlestickData<Time>, null, unknown> {
    let previousTick = null;
    
    for (const item of data) {
        const currentValue = parseFloat(item.tick);
        let candleData: CandlestickData<Time>;

        if (previousTick === null) {
            candleData = {
                time: item.timestamp as Time,
                open: currentValue,
                high: currentValue,
                low: currentValue,
                close: currentValue
            };
        } else {
            candleData = {
                time: item.timestamp as Time,
                open: previousTick,
                high: Math.max(previousTick, currentValue),
                low: Math.min(previousTick, currentValue),
                close: currentValue
            };
        }

        previousTick = currentValue;
        yield candleData;
    }
    return null;
}

function Dex() {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

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

        // Generate mock data matching GraphQL structure with more volatility
        const mockResponse = generateMockData(200);
        const allData = mockResponse.setCurrentTickEventss.items;

        console.log(`allData: ${JSON.stringify(allData)}`);
        
        
        // Split data into initial and updates
        const splitIndex = Math.floor(allData.length / 2);
        const initialData = allData.slice(0, splitIndex);
        const updateData = allData.slice(splitIndex);

        // Set initial data
        series.setData(processTickData(initialData));
        chart.timeScale().fitContent();
        chart.timeScale().scrollToPosition(5, false);

        // Setup real-time updates
        const streamingDataProvider = getNextRealtimeUpdate(updateData);
        const intervalID = setInterval(() => {
            const update = streamingDataProvider.next();
            if (update.done) {
                clearInterval(intervalID);
                return;
            }
            series.update(update.value);
        }, 100);

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
            clearInterval(intervalID);
            chart.remove();
        };
    }, []);

    return (
        <div className="w-full h-screen bg-[#151924] text-white">
            <div className="w-full p-4">
                <div ref={chartContainerRef} className="w-full h-[600px]" />
            </div>
        </div>
    );
}

export default Dex;