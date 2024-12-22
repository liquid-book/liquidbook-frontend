// Types
interface Order {
    price: number;
    size: number;
    total?: number;
    timestamp?: number;
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
const BASE_PRICE = 3520.42;
const DEPTH_ORDER_COUNT = 13;
const STANDARD_ORDER_COUNT = 7;
const UPDATE_INTERVAL = 1000;
const PRICE_VOLATILITY = 0.0001;
const SIZE_MIN = 0.001;
const SIZE_MAX = 35;

// Helper functions
const generateRandomPrice = (basePrice: number): number => {
    const change = basePrice * PRICE_VOLATILITY * (Math.random() - 0.5);
    return Number((basePrice + change).toFixed(2));
};

const generateRandomSize = (): number => {
    return Number((SIZE_MIN + Math.random() * (SIZE_MAX - SIZE_MIN)).toFixed(6));
};

const calculateTotal = (orders: Order[]): Order[] => {
    let runningTotal = 0;
    return orders.map(order => {
        runningTotal += order.size;
        return { ...order, total: runningTotal };
    });
};

const generateInitialOrderBook = (isDepthView: boolean = false): OrderBook => {
    const orderCount = isDepthView ? DEPTH_ORDER_COUNT : STANDARD_ORDER_COUNT;
    const asks: Order[] = Array.from({ length: orderCount }, (_, i) => ({
        price: BASE_PRICE + (i * 0.5),
        size: generateRandomSize(),
        total: 0,
        timestamp: Date.now()
    }));

    const bids: Order[] = Array.from({ length: orderCount }, (_, i) => ({
        price: BASE_PRICE - ((i + 1) * 0.5),
        size: generateRandomSize(),
        total: 0,
        timestamp: Date.now()
    }));

    const sortedAsks = calculateTotal(asks.sort((a, b) => a.price - b.price));
    const sortedBids = calculateTotal(bids.sort((a, b) => b.price - a.price));

    return {
        asks: sortedAsks,
        bids: sortedBids,
        lastPrice: BASE_PRICE,
        spread: Number((sortedAsks[0].price - sortedBids[0].price).toFixed(2)),
        lastUpdate: Date.now()
    };
};

const updateOrderBook = (currentBook: OrderBook): OrderBook => {
    const newAsks = currentBook.asks.map(ask => ({
        ...ask,
        price: Math.random() < 0.2 ? generateRandomPrice(ask.price) : ask.price,
        size: Math.random() < 0.3 ? generateRandomSize() : ask.size,
        timestamp: Date.now()
    }));

    const newBids = currentBook.bids.map(bid => ({
        ...bid,
        price: Math.random() < 0.2 ? generateRandomPrice(bid.price) : bid.price,
        size: Math.random() < 0.3 ? generateRandomSize() : bid.size,
        timestamp: Date.now()
    }));

    const sortedAsks = calculateTotal(newAsks.sort((a, b) => a.price - b.price));
    const sortedBids = calculateTotal(newBids.sort((a, b) => b.price - a.price));
    const newLastPrice = Math.random() < 0.5 ? sortedBids[0].price : sortedAsks[0].price;

    return {
        asks: sortedAsks,
        bids: sortedBids,
        lastPrice: newLastPrice,
        spread: Number((sortedAsks[0].price - sortedBids[0].price).toFixed(2)),
        lastUpdate: Date.now()
    };
};

// React Component
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUpRight, ArrowDownRight, Grid, Menu, ArrowUp01, ArrowDown01, ArrowUp, ArrowDown } from 'lucide-react';

const OrderBookComponent: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const [layoutMode, setLayoutMode] = useState<LayoutMode>('standard');
    const [orderBook, setOrderBook] = useState<OrderBook>(generateInitialOrderBook(layoutMode === 'depth'));
    const [selectedDecimal, setSelectedDecimal] = useState<DecimalPrecision>('0.01');
    const [viewType, setViewType] = useState<ViewType>('both');
    const [isUpdating, setIsUpdating] = useState<boolean>(true);
    const [priceDirection, setPriceDirection] = useState<'up' | 'down'>('up');

    // Set mounted state after initial render
    useEffect(() => {
        setMounted(true);
    }, []);

    // Handle price updates and direction
    useEffect(() => {
        if (!mounted || !isUpdating) return;

        const interval = setInterval(() => {
            setOrderBook(prevBook => {
                const newBook = updateOrderBook(prevBook);
                setPriceDirection(newBook.lastPrice >= prevBook.lastPrice ? 'up' : 'down');
                return newBook;
            });
        }, UPDATE_INTERVAL);

        return () => clearInterval(interval);
    }, [mounted, isUpdating]);

    const toggleView = useCallback(() => {
        const views: ViewType[] = ['both', 'bids', 'asks'];
        const currentIndex = views.indexOf(viewType);
        setViewType(views[(currentIndex + 1) % views.length]);
    }, [viewType]);

    const toggleLayoutMode = useCallback(() => {
        setLayoutMode(prev => {
            const newMode = prev === 'standard' ? 'depth' : 'standard';
            // Regenerate order book with new order count
            setOrderBook(generateInitialOrderBook(newMode === 'depth'));
            return newMode;
        });
    }, []);

    const toggleUpdates = useCallback(() => {
        setIsUpdating(prev => !prev);
    }, []);

    const totalBuyVolume = orderBook.bids.reduce((acc, bid) => acc + bid.size, 0);
    const totalSellVolume = orderBook.asks.reduce((acc, ask) => acc + ask.size, 0);
    const totalVolume = totalBuyVolume + totalSellVolume;
    const buyPercentage = (totalBuyVolume / totalVolume) * 100;
    const sellPercentage = (totalSellVolume / totalVolume) * 100;

    const sortedAsks = [...orderBook.asks].sort((a, b) => a.price - b.price);
    if (!mounted) {
        return (
            <div className="w-full max-w-xs mx-auto bg-black text-white p-4">
                <div className="text-center py-4">Loading order book...</div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-xs mx-auto bg-[#141414] bg-opacity-50 rounded-xl border border-[#1B1B1B] text-white p-4">
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
                        className={`p-2 rounded hover:bg-gray-700 ${layoutMode === 'depth' ? 'bg-blue-500' : 'bg-gray-800'
                            }`}
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

            {/* Last Price */}
            {/* <div className="text-center mb-4">
                <div className={`flex items-center justify-center text-xl ${priceDirection === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                    {orderBook.lastPrice.toFixed(2)}
                    {priceDirection === 'up' ? (
                        <ArrowUpRight className="w-5 h-5 ml-1" />
                    ) : (
                        <ArrowDownRight className="w-5 h-5 ml-1" />
                    )}
                </div>
                <div className="text-gray-400 text-sm">
                    Spread: {orderBook.spread}%
                </div>
            </div> */}

            {layoutMode === 'depth' ? (
                // Depth View Layout
                <div>
                    {/* Last Price */}
                    <div className="text-center mb-4">
                        <div className={`flex items-center justify-center text-md ${priceDirection === 'up' ? 'text-green-400' : 'text-red-400'
                            }`}>
                            {orderBook.lastPrice.toFixed(2)}
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
                                        {orderBook.bids[i]?.price.toFixed(2)}
                                    </div>
                                    <div className="text-red-400">
                                        {ask.price.toFixed(2)}
                                    </div>
                                </div>
                                <div className="text-right text-gray-200 z-10">
                                    {ask.size.toFixed(6)}
                                </div>

                                {/* Background bars - starting from center */}
                                <div
                                    className="absolute left-[50%] top-0 bottom-0 bg-green-900/40"
                                    style={{
                                        width: `${(orderBook.bids[i]?.size / Math.max(...orderBook.bids.map(b => b.size))) * 50}%`,
                                        transform: 'translateX(-100%)'
                                    }}
                                />
                                <div
                                    className="absolute left-[50%] top-0 bottom-0 bg-red-900/40"
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
                    {/* Column Headers */}
                    <div className="grid grid-cols-2 mb-2 text-gray-400 text-sm">
                        <div>Price</div>
                        <div className="text-right">Size</div>
                    </div>

                    {(viewType === 'both' || viewType === 'asks') && (
                        <div className="flex flex-col-reverse space-y-1 space-y-reverse">
                            {sortedAsks.map((ask, i) => (
                                <div key={`ask-${i}`} className="relative group">
                                    <div
                                        className="absolute left-0 top-0 bottom-0 bg-red-900/40"
                                        style={{
                                            width: `${(ask.total || 0) / Math.max(...orderBook.asks.map(a => a.total || 0)) * 100}%`
                                        }}
                                    />
                                    <div className="relative grid grid-cols-2 py-1 group-hover:bg-gray-800 text-xs font-light">
                                        <div className="text-red-400">{ask.price.toFixed(2)}</div>
                                        <div className="text-right text-gray-200">{ask.size.toFixed(6)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Spread */}
                    {viewType === 'both' && (
                        <div className="text-gray-400 text-md py-2">
                            <div className="flex items-center">
                                <div className={`flex items-center justify-center  ${priceDirection === 'up' ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                    {orderBook.lastPrice.toFixed(2)}
                                    {priceDirection === 'up' ? (
                                        <ArrowUp className="w-3 h-3 ml-1" />
                                    ) : (
                                        <ArrowDown className="w-3 h-3 ml-1" />
                                    )}
                                </div>
                                <span className="ml-2 text-white">{orderBook.spread}% Spread</span>
                            </div>
                        </div>
                    )}

                    {(viewType === 'both' || viewType === 'bids') && (
                        <div className="space-y-1">
                            {orderBook.bids.map((bid, i) => (
                                <div key={`bid-${i}`} className="relative group">
                                    <div
                                        className="absolute left-0 top-0 bottom-0 bg-green-900/40"
                                        style={{ width: `${(bid.total || 0) / Math.max(...orderBook.bids.map(b => b.total || 0)) * 100}%` }}
                                    />
                                    <div className="relative grid grid-cols-2 py-1 group-hover:bg-gray-800 text-xs font-light">
                                        <div className="text-green-400">{bid.price.toFixed(2)}</div>
                                        <div className="text-right text-gray-200">{bid.size.toFixed(6)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Buy/Sell Distribution */}
            {/* <div className="mt-4 h-2 flex rounded overflow-hidden">
                <div
                    className="bg-green-600/80 transition-all duration-500"
                    style={{ width: `${buyPercentage}%` }}
                />
                <div
                    className="bg-red-600/80 transition-all duration-500"
                    style={{ width: `${sellPercentage}%` }}
                />
            </div>
            <div className="flex justify-between text-sm mt-1">
                <div className="text-green-400">
                    Buy {buyPercentage.toFixed(1)}%
                </div>
                <div className="text-red-400">
                    Sell {sellPercentage.toFixed(1)}%
                </div>
            </div> */}

            {/* Distribution bar */}
            <div className="h-6 flex mt-4 text-xs">
                <div
                    className="bg-green-900/40 flex items-center justify-start"
                    style={{ width: `${buyPercentage}%` }}
                >
                    <span className="text-green-400 font-medium">Buy {buyPercentage.toFixed(1)}%</span>
                </div>
                <div
                    className="bg-red-900/40 flex items-center justify-end"
                    style={{ width: `${sellPercentage}%` }}
                >
                    <span className="text-red-400 font-medium text-end">{sellPercentage.toFixed(1)}% Sell</span>
                </div>
            </div>
        </div>
    );
};

export default OrderBookComponent;