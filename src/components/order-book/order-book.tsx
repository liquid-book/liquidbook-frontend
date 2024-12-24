import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Grid, Menu, ArrowUp, ArrowDown } from 'lucide-react';

interface Order {
    price: number;
    size: number;
    total?: number;
}

interface OrderBook {
    asks: Order[];
    bids: Order[];
    lastPrice: number;
    spread: number;
    lastUpdate?: number;
}

type ViewType = 'both' | 'bids' | 'asks';
type DecimalPrecision = '0.01' | '0.1' | '1';
type LayoutMode = 'standard' | 'depth';

// Constants
const DEPTH_ORDER_COUNT = 11;
const STANDARD_ORDER_COUNT = 6;

const OrderBookSkeleton = ({ layoutMode }: { layoutMode: 'standard' | 'depth' }) => {
    return (
        <div className="w-full max-w-xs mx-auto bg-gray-900 rounded-xl border border-gray-800 text-white p-4 animate-pulse">
            {/* Header Controls Skeleton */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                    <div className="w-8 h-8 bg-gray-800 rounded" />
                    <div className="w-8 h-8 bg-gray-800 rounded" />
                </div>
                <div className="w-16 h-8 bg-gray-800 rounded" />
            </div>

            {layoutMode === 'depth' ? (
                // Depth View Skeleton
                <div>
                    {/* Last Price Skeleton */}
                    <div className="text-center mb-4">
                        <div className="w-24 h-6 bg-gray-800 rounded mx-auto mb-2" />
                        <div className="w-20 h-4 bg-gray-800 rounded mx-auto" />
                    </div>

                    {/* Column Headers */}
                    <div className="grid grid-cols-3 mb-2">
                        <div className="w-12 h-4 bg-gray-800 rounded" />
                        <div className="w-12 h-4 bg-gray-800 rounded mx-auto" />
                        <div className="w-12 h-4 bg-gray-800 rounded ml-auto" />
                    </div>

                    {/* Depth Rows */}
                    {[...Array(11)].map((_, i) => (
                        <div key={i} className="grid grid-cols-3 gap-2 mb-1">
                            <div className="w-16 h-4 bg-gray-800 rounded" />
                            <div className="flex justify-center space-x-4">
                                <div className="w-16 h-4 bg-gray-800 rounded" />
                                <div className="w-16 h-4 bg-gray-800 rounded" />
                            </div>
                            <div className="w-16 h-4 bg-gray-800 rounded ml-auto" />
                        </div>
                    ))}
                </div>
            ) : (
                // Standard View Skeleton
                <div>
                    {/* Column Headers */}
                    <div className="grid grid-cols-2 mb-2">
                        <div className="w-12 h-4 bg-gray-800 rounded" />
                        <div className="w-12 h-4 bg-gray-800 rounded ml-auto" />
                    </div>

                    {/* Asks */}
                    <div className="space-y-1 mb-2">
                        {[...Array(8)].map((_, i) => (
                            <div key={`ask-${i}`} className="grid grid-cols-2 gap-4">
                                <div className="w-20 h-4 bg-gray-800 rounded" />
                                <div className="w-20 h-4 bg-gray-800 rounded ml-auto" />
                            </div>
                        ))}
                    </div>

                    {/* Price Spread */}
                    <div className="py-4 flex justify-between">
                        <div className="w-24 h-4 bg-gray-800 rounded" />
                        <div className="w-20 h-4 bg-gray-800 rounded" />
                    </div>

                    {/* Bids */}
                    <div className="space-y-1">
                        {[...Array(8)].map((_, i) => (
                            <div key={`bid-${i}`} className="grid grid-cols-2 gap-4">
                                <div className="w-20 h-4 bg-gray-800 rounded" />
                                <div className="w-20 h-4 bg-gray-800 rounded ml-auto" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Volume Bar Skeleton */}
            <div className="h-6 flex mt-4">
                <div className="w-1/2 h-full bg-gray-800 rounded-l" />
                <div className="w-1/2 h-full bg-gray-800 rounded-r" />
            </div>
        </div>
    );
};

const OrderBookComponent = () => {
    const [mounted, setMounted] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true); // Only for initial load
    const [layoutMode, setLayoutMode] = useState<LayoutMode>('standard');
    const [selectedDecimal, setSelectedDecimal] = useState<DecimalPrecision>('0.01');
    const [fullOrderBook, setFullOrderBook] = useState<OrderBook>({
        asks: [],
        bids: [],
        lastPrice: 0,
        spread: 0,
        lastUpdate: Date.now()
    });
    const [viewType, setViewType] = useState<ViewType>('both');
    const [priceDirection, setPriceDirection] = useState<'up' | 'down'>('up');

    const orderBook = useMemo(() => {
        const orderCount = layoutMode === 'depth' ? DEPTH_ORDER_COUNT : STANDARD_ORDER_COUNT;
        return {
            ...fullOrderBook,
            asks: fullOrderBook.asks.slice(0, orderCount),
            bids: fullOrderBook.bids.slice(0, orderCount)
        };
    }, [fullOrderBook, layoutMode]);

    const calculateTotal = (orders: Order[]): Order[] => {
        let runningTotal = 0;
        return orders.map(order => {
            runningTotal += order.size;
            return { ...order, total: runningTotal };
        });
    };

    const formatPrice = (price: number): string => {
        const precision = parseFloat(selectedDecimal);
        return (Math.round(price / precision) * precision).toFixed(2);
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const fetchOrderBook = async () => {
            try {
                const response = await fetch('https://www.okx.com/api/v5/market/books?instId=ETH-USDC&sz=20');
                const data = await response.json();

                if (data.data?.[0]) {
                    const bookData = data.data[0];
                    const asks = bookData.asks.map((ask: string[]) => ({
                        price: parseFloat(ask[0]),
                        size: parseFloat(ask[1])
                    }));
                    const bids = bookData.bids.map((bid: string[]) => ({
                        price: parseFloat(bid[0]),
                        size: parseFloat(bid[1])
                    }));

                    const sortedAsks = calculateTotal(asks.sort((a: Order, b: Order) => a.price - b.price));
                    const sortedBids = calculateTotal(bids.sort((a: Order, b: Order) => b.price - a.price));

                    const newOrderBook = {
                        asks: sortedAsks,
                        bids: sortedBids,
                        lastPrice: parseFloat(bookData.asks[0][0]),
                        spread: Number((parseFloat(bookData.asks[0][0]) - parseFloat(bookData.bids[0][0])).toFixed(2)),
                        lastUpdate: Date.now()
                    };

                    setFullOrderBook(prevBook => {
                        setPriceDirection(newOrderBook.lastPrice >= prevBook.lastPrice ? 'up' : 'down');
                        return newOrderBook;
                    });
                }
            } catch (error) {
                console.error('Error fetching order book:', error);
            } finally {
                setInitialLoading(false); // Set initial loading to false after first fetch
            }
        };

        const interval = setInterval(fetchOrderBook, 1000);
        fetchOrderBook(); // Initial fetch

        return () => clearInterval(interval);
    }, [mounted]);

    const toggleView = useCallback(() => {
        const views: ViewType[] = ['both', 'bids', 'asks'];
        const currentIndex = views.indexOf(viewType);
        setViewType(views[(currentIndex + 1) % views.length]);
    }, [viewType]);

    const toggleLayoutMode = useCallback(() => {
        setLayoutMode(prev => prev === 'standard' ? 'depth' : 'standard');
    }, []);

    // Calculate volumes
    const totalBuyVolume = orderBook.bids.reduce((acc, bid) => acc + bid.size, 0);
    const totalSellVolume = orderBook.asks.reduce((acc, ask) => acc + ask.size, 0);
    const totalVolume = totalBuyVolume + totalSellVolume;
    const buyPercentage = (totalBuyVolume / totalVolume) * 100;
    const sellPercentage = (totalSellVolume / totalVolume) * 100;

    // Only show skeleton on initial load
    if (!mounted || initialLoading) {
        return <OrderBookSkeleton layoutMode={layoutMode} />;
    }
    return (
        <div className="w-full max-w-xs mx-auto bg-gray-900 rounded-xl border border-gray-800 text-white p-4">
            {/* Header Controls */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                    <button
                        onClick={toggleView}
                        className="p-2 bg-gray-800 rounded hover:bg-gray-700"
                    >
                        <Menu className="w-3 h-3" />
                    </button>
                    <button
                        onClick={toggleLayoutMode}
                        className={`p-2 rounded hover:bg-gray-700 ${layoutMode === 'depth' ? 'bg-blue-500' : 'bg-gray-800'}`}
                    >
                        <Grid className="w-3 h-3" />
                    </button>
                </div>
                <select
                    value={selectedDecimal}
                    onChange={(e) => setSelectedDecimal(e.target.value as DecimalPrecision)}
                    className="bg-gray-800 rounded px-3 py-1 hover:bg-gray-700 text-xs"
                >
                    <option value="0.01">0.01</option>
                    <option value="0.1">0.1</option>
                    <option value="1">1.0</option>
                </select>
            </div>

            <div className="transition-all duration-300 ease-in-out">
                {layoutMode === 'depth' ? (
                    // Depth View Layout
                    <div>
                        {/* Last Price */}
                        <div className="text-center mb-4">
                            <div className={`flex items-center justify-center text-md ${priceDirection === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                                {formatPrice(orderBook.lastPrice)}
                                {priceDirection === 'up' ? (
                                    <ArrowUp className="w-4 h-4 ml-1" />
                                ) : (
                                    <ArrowDown className="w-4 h-4 ml-1" />
                                )}
                            </div>
                            <div className="text-white text-sm">
                                Spread: {orderBook.spread}%
                            </div>
                        </div>

                        <div className="grid grid-cols-3 text-gray-400 mb-2">
                            <div>Size</div>
                            <div className="text-center">Price</div>
                            <div className="text-right">Size</div>
                        </div>

                        <div className="space-y-1">
                            {orderBook.asks.map((ask, i) => (
                                <div key={`depth-${i}`} className="grid relative text-xs py-1" style={{ gridTemplateColumns: '1fr 2fr 1fr' }}>
                                    <div className="text-gray-200 z-10">
                                        {orderBook.bids[i]?.size.toFixed(6)}
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-3 z-10">
                                        <div className="text-green-400 text-right">
                                            {formatPrice(orderBook.bids[i]?.price)}
                                        </div>
                                        <div className="text-red-400">
                                            {formatPrice(ask.price)}
                                        </div>
                                    </div>
                                    <div className="text-right text-gray-200 z-10">
                                        {ask.size.toFixed(6)}
                                    </div>

                                    <div
                                        className="absolute left-1/2 top-0 bottom-0 bg-green-900/40 transition-all duration-300"
                                        style={{
                                            width: `${(orderBook.bids[i]?.size / Math.max(...orderBook.bids.map(b => b.size))) * 50}%`,
                                            transform: 'translateX(-100%)'
                                        }}
                                    />
                                    <div
                                        className="absolute left-1/2 top-0 bottom-0 bg-red-900/40 transition-all duration-300"
                                        style={{
                                            width: `${(ask.size / Math.max(...orderBook.asks.map(a => a.size))) * 50}%`
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    // Standard Layout
                    <div>
                        <div className="grid grid-cols-2 mb-2 text-gray-400 text-sm">
                            <div>Price</div>
                            <div className="text-right">Size</div>
                        </div>

                        {(viewType === 'both' || viewType === 'asks') && (
                            <div className="flex flex-col-reverse space-y-1 space-y-reverse">
                                {orderBook.asks.map((ask, i) => (
                                    <div key={`ask-${i}`} className="relative group">
                                        <div
                                            className="absolute left-0 top-0 bottom-0 bg-red-900/40 transition-all duration-300"
                                            style={{
                                                width: `${(ask.total || 0) / Math.max(...orderBook.asks.map(a => a.total || 0)) * 100}%`
                                            }}
                                        />
                                        <div className="relative grid grid-cols-2 py-1 group-hover:bg-gray-800 text-xs font-light">
                                            <div className="text-red-400">{formatPrice(ask.price)}</div>
                                            <div className="text-right text-gray-200">{ask.size.toFixed(6)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {viewType === 'both' && (
                            <div className="text-gray-400 text-md py-2">
                                <div className="flex items-center">
                                    <div className={`flex items-center justify-center ${priceDirection === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                                        {formatPrice(orderBook.lastPrice)}
                                        {priceDirection === 'up' ? (
                                            <ArrowUp className="w-3 h-3 ml-1" />
                                        ) : (
                                            <ArrowDown className="w-3 h-3 ml-1" />
                                        )}
                                    </div>
                                    <span className="ml-2 text-white">Spread: {orderBook.spread}%</span>
                                </div>
                            </div>
                        )}

                        {(viewType === 'both' || viewType === 'bids') && (
                            <div className="space-y-1">
                                {orderBook.bids.map((bid, i) => (
                                    <div key={`bid-${i}`} className="relative group">
                                        <div
                                            className="absolute left-0 top-0 bottom-0 bg-green-900/40 transition-all duration-300"
                                            style={{
                                                width: `${(bid.total || 0) / Math.max(...orderBook.bids.map(b => b.total || 0)) * 100}%`
                                            }}
                                        />
                                        <div className="relative grid grid-cols-2 py-1 group-hover:bg-gray-800 text-xs font-light">
                                            <div className="text-green-400">{formatPrice(bid.price)}</div>
                                            <div className="text-right text-gray-200">{bid.size.toFixed(6)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="h-6 flex mt-4 text-xs">
                {/* Buy Section */}
                <div
                    className="bg-green-900/40 flex items-center justify-start px-2 transition-all duration-300"
                    style={{ width: `${buyPercentage}%` }}
                >
                    <span className="text-green-400 font-medium flex-shrink-0">
                        Buy {buyPercentage.toFixed(1)}%
                    </span>
                </div>

                {/* Sell Section */}
                <div
                    className="bg-red-900/40 flex items-center justify-end px-2 transition-all duration-300"
                    style={{ width: `${sellPercentage}%` }}
                >
                    <span className="text-red-400 font-medium text-end flex-shrink-0">
                        {sellPercentage.toFixed(1)}% Sell
                    </span>
                </div>
            </div>

        </div>
    );
};

export default OrderBookComponent;