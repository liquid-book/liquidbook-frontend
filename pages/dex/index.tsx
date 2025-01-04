import React, { useEffect, useRef } from 'react'
import { createChart, ColorType, Time, IChartApi, ISeriesApi, CandlestickData } from 'lightweight-charts'

interface GeneratedData {
    initialData: CandlestickData<Time>[];
    realtimeUpdates: CandlestickData<Time>[];
}

function Dex() {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart: IChartApi = createChart(chartContainerRef.current, {
            layout: {
                // textColor: 'rgba(255, 255, 255, 0.9)',
                // background: { type: ColorType.Solid, color: '#151924' },
            },
            grid: {
                // vertLines: { color: 'rgba(42, 46, 57, 0.6)' },
                // horzLines: { color: 'rgba(42, 46, 57, 0.6)' },
            },
            timeScale: {
                // borderColor: 'rgba(42, 46, 57, 0.6)',
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

        const data = generateData(2500, 20, 1000);
        series.setData(data.initialData);
        chart.timeScale().fitContent();
        chart.timeScale().scrollToPosition(5, false);

        const streamingDataProvider = getNextRealtimeUpdate(data.realtimeUpdates);
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
            <header className="w-full h-16 border-b border-gray-800 px-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="text-xl font-bold">LIQ-USD</span>
                    <div className="text-sm">
                        <span className="text-gray-400">Mark</span>
                        <span className="ml-2 text-green-400">27.066</span>
                    </div>
                    <div className="text-sm">
                        <span className="text-gray-400">24h Change</span>
                        <span className="ml-2 text-red-400">-0.378 / -1.38%</span>
                    </div>
                </div>
            </header>
            <div className="w-full p-4">
                <div ref={chartContainerRef} className="w-full h-[600px]" />
            </div>
        </div>
    );
}

// Rest of the code remains the same...

// Data generation utilities
let randomFactor = 25 + Math.random() * 25;
const samplePoint = (i: number): number =>
    i * (0.5 +
        Math.sin(i / 1) * 0.2 +
        Math.sin(i / 2) * 0.4 +
        Math.sin(i / randomFactor) * 0.8 +
        Math.sin(i / 50) * 0.5) +
    200 +
    i * 2;

function generateData(
    numberOfCandles: number = 500,
    updatesPerCandle: number = 5,
    startAt: number = 100
): GeneratedData {
    const createCandle = (val: number, time: Time): CandlestickData<Time> => ({
        time,
        open: val,
        high: val,
        low: val,
        close: val,
    });

    const updateCandle = (candle: CandlestickData<Time>, val: number): CandlestickData<Time> => ({
        time: candle.time,
        close: val,
        open: candle.open,
        low: Math.min(candle.low, val),
        high: Math.max(candle.high, val),
    });

    randomFactor = 25 + Math.random() * 25;
    const date = new Date(Date.UTC(2024, 0, 1, 12, 0, 0, 0));
    const numberOfPoints = numberOfCandles * updatesPerCandle;
    const initialData: CandlestickData<Time>[] = [];
    const realtimeUpdates: CandlestickData<Time>[] = [];
    let lastCandle: CandlestickData<Time> = createCandle(samplePoint(-1), date.getTime() / 1000 as Time);
    let previousValue = samplePoint(-1);

    for (let i = 0; i < numberOfPoints; ++i) {
        if (i % updatesPerCandle === 0) {
            date.setUTCDate(date.getUTCDate() + 1);
        }
        const time = date.getTime() / 1000 as Time;
        let value = samplePoint(i);
        const diff = (value - previousValue) * Math.random();
        value = previousValue + diff;
        previousValue = value;

        if (i % updatesPerCandle === 0) {
            const candle = createCandle(value, time);
            lastCandle = candle;
            if (i >= startAt) {
                realtimeUpdates.push(candle);
            }
        } else {
            const newCandle = updateCandle(lastCandle, value);
            lastCandle = newCandle;
            if (i >= startAt) {
                realtimeUpdates.push(newCandle);
            } else if ((i + 1) % updatesPerCandle === 0) {
                initialData.push(newCandle);
            }
        }
    }

    return {
        initialData,
        realtimeUpdates,
    };
}

function* getNextRealtimeUpdate(realtimeData: CandlestickData<Time>[]): Generator<CandlestickData<Time>, null, unknown> {
    for (const dataPoint of realtimeData) {
        yield dataPoint;
    }
    return null;
}

export default Dex