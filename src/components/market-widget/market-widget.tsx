import React, { useEffect, useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface MarketData {
    markPrice: number | null;
    spotPrice: number | null;
    volume24h: number | null;
    high24h: number | null;
    low24h: number | null;
    priceChange24h: number | null;
    priceChangePercent24h: number | null;
}

const SkeletonLoader = () => {
    return (
        <div className="flex flex-col lg:flex-row text-sm mb-4 gap-4 animate-pulse">
            {/* Trading Pair Card Skeleton */}
            <div className="w-full lg:w-1/5 flex items-center space-x-4 rounded-lg shadow-md border border-gray-700 bg-[#131722] p-3">
                <div className="flex items-center space-x-2">
                    <div className="w-14 h-14 bg-gray-700 rounded-full" />
                    <div className="space-y-2">
                        <div className="h-4 w-20 bg-gray-700 rounded" />
                        <div className="h-4 w-24 bg-gray-700 rounded" />
                    </div>
                </div>
            </div>

            {/* Market Data Grid Skeleton */}
            <div className="w-full lg:w-4/5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 rounded-lg shadow-md border border-gray-700 bg-[#131722] p-4">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="space-y-2">
                        <div className="h-4 w-20 bg-gray-700 rounded" />
                        <div className="h-4 w-24 bg-gray-700 rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
};

const MarketDataWidget = () => {
    const [marketData, setMarketData] = useState<MarketData>({
        markPrice: null,
        spotPrice: null,
        volume24h: null,
        high24h: null,
        low24h: null,
        priceChange24h: null,
        priceChangePercent24h: null,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const pollMarketData = async () => {
            try {
                const tickerResponse = await fetch('https://www.okx.com/api/v5/market/ticker?instId=ETH-USDC');
                const markPriceResponse = await fetch('https://www.okx.com/api/v5/public/mark-price?instId=ETH-USDC');

                const [tickerData, markPriceData] = await Promise.all([
                    tickerResponse.json(),
                    markPriceResponse.json()
                ]);

                if (tickerData.data?.[0] && markPriceData.data?.[0]) {
                    const ticker = tickerData.data[0];
                    const priceChange = parseFloat(ticker.last) - parseFloat(ticker.open24h);
                    const priceChangePercent = (priceChange / parseFloat(ticker.open24h)) * 100;

                    setMarketData({
                        markPrice: parseFloat(markPriceData.data[0].markPx),
                        spotPrice: parseFloat(ticker.last),
                        volume24h: parseFloat(ticker.volCcy24h),
                        high24h: parseFloat(ticker.high24h),
                        low24h: parseFloat(ticker.low24h),
                        priceChange24h: priceChange,
                        priceChangePercent24h: priceChangePercent,
                    });
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching market data:', error);
                setIsLoading(false);
            }
        };

        const intervalId = setInterval(pollMarketData, 1000);
        pollMarketData();

        return () => clearInterval(intervalId);
    }, []);

    const formatNumber = (value: number | null, options: {
        decimals?: number;
        prefix?: string;
        suffix?: string;
    } = {}) => {
        if (value === null) return 'Loading...';
        const { decimals = 2, prefix = '', suffix = '' } = options;
        return `${prefix}${value.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        })}${suffix}`;
    };

    if (isLoading) {
        return <SkeletonLoader />;
    }

    return (
        <div className="flex flex-col lg:flex-row text-sm mb-4 gap-4">
            <div className="w-full lg:w-1/5 flex items-center justify-between lg:justify-start space-x-4 rounded-lg shadow-md border border-gray-700 bg-[#131722] p-1">
                <div className="flex items-center space-x-2">
                    <img src="/icon/eth-usdc.svg" alt="ETH" className="w-10 h-10 lg:w-14 lg:h-14" />
                    <div>
                        <span className="text-white text-base lg:text-lg font-semibold">ETH/USDC</span>
                    </div>
                </div>
                <div className="text-white text-sm lg:text-base">
                    {formatNumber(marketData.spotPrice, { prefix: '$' })}
                    {marketData.priceChangePercent24h !== null && (
                        <span
                            className={`ml-2 ${marketData.priceChangePercent24h >= 0 ? 'text-green-500' : 'text-red-500'}`}
                        >
                            {marketData.priceChangePercent24h >= 0 ? (
                                <ArrowUpIcon className="inline w-3 h-3" />
                            ) : (
                                <ArrowDownIcon className="inline w-3 h-3" />
                            )}
                            {formatNumber(Math.abs(marketData.priceChangePercent24h), { suffix: '%' })}
                        </span>
                    )}
                </div>
            </div>

            <div className="w-4/5 flex flex-wrap space-x-10 items-center rounded-lg shadow-md border border-gray-700 bg-[#131722] px-4 py-2">
                <div>
                    <span className="text-gray-400 block underline">Mark Price</span>
                    <span className="text-white">{formatNumber(marketData.markPrice, { prefix: '$' })}</span>
                </div>
                <div>
                    <span className="text-gray-400 block underline">Spot Price</span>
                    <span className="text-white">{formatNumber(marketData.spotPrice, { prefix: '$' })}</span>
                </div>
                <div>
                    <span className="text-gray-400 block underline">24h Volume</span>
                    <span className="text-white">{formatNumber(marketData.volume24h, { prefix: '$', decimals: 0 })} USDT</span>
                </div>
                <div>
                    <span className="text-gray-400 block underline">24h High</span>
                    <span className="text-white">{formatNumber(marketData.high24h, { prefix: '$' })}</span>
                </div>
                <div>
                    <span className="text-gray-400 block underline">24h Low</span>
                    <span className="text-white">{formatNumber(marketData.low24h, { prefix: '$' })}</span>
                </div>
            </div>
        </div>
    );
};

export default MarketDataWidget;