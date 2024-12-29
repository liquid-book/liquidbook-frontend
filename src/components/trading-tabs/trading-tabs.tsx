import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu, ChevronDown } from 'lucide-react';

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

const TradingTabs = () => {
    const [mounted, setMounted] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [orderBook, setOrderBook] = useState<OrderBook>({
        asks: [],
        bids: [],
        lastPrice: 0,
        spread: 0,
        lastUpdate: Date.now()
    });

    const calculateTotal = (orders: Order[]): Order[] => {
        let runningTotal = 0;
        return orders.map(order => {
            runningTotal += order.size;
            return { ...order, total: runningTotal };
        });
    };

    const formatPrice = (price: number): string => {
        return price.toFixed(1);
    };

    const formatNumber = (num: number): string => {
        return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
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

                    const sortedAsks = calculateTotal(asks.sort((a, b) => a.price - b.price));
                    const sortedBids = calculateTotal(bids.sort((a, b) => b.price - a.price));
                    const spreadValue = Number((parseFloat(bookData.asks[0][0]) - parseFloat(bookData.bids[0][0])).toFixed(1));
                    const spreadPercentage = (spreadValue / parseFloat(bookData.asks[0][0]) * 100).toFixed(3);

                    setOrderBook({
                        asks: sortedAsks,
                        bids: sortedBids,
                        lastPrice: parseFloat(bookData.asks[0][0]),
                        spread: spreadValue,
                        lastUpdate: Date.now()
                    });
                }
            } catch (error) {
                console.error('Error fetching order book:', error);
            } finally {
                setInitialLoading(false);
            }
        };

        const interval = setInterval(fetchOrderBook, 1000);
        fetchOrderBook();

        return () => clearInterval(interval);
    }, [mounted]);

    if (!mounted || initialLoading) {
        return <div className="animate-pulse bg-[#0D1117] h-[600px]" />;
    }

    return (
        <Tabs defaultValue="order-book" className="w-full">
            <TabsList className="flex w-full bg-[#0D1117] border-b border-gray-800">
                <TabsTrigger
                    value="order-book"
                    className="flex-1 px-4 py-2 text-sm font-medium data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#00B4C9] text-gray-400 hover:text-gray-200"
                >
                    Order Book
                </TabsTrigger>
                <TabsTrigger
                    value="trades"
                    className="flex-1 px-4 py-2 text-sm font-medium data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#00B4C9] text-gray-400 hover:text-gray-200"
                >
                    Trades
                </TabsTrigger>
            </TabsList>

            <TabsContent value="order-book" className="mt-0">
                <div className="w-full bg-[#0D1117] text-white">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                        <div className="flex items-center gap-2">
                            <span className="text-base">0.1</span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-base">USD</span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 px-4 py-2 text-sm text-gray-400">
                        <div>Price</div>
                        <div className="text-left">Size (USD)</div>
                        <div className="text-right">Total (USD)</div>
                    </div>

                    <div className="flex flex-col-reverse">
                        {orderBook.asks.slice(0, 11).map((ask, i) => (
                            <div key={`ask-${i}`} className="relative group">
                                <div
                                    className="absolute right-0 top-0 bottom-0 bg-red-900/20"
                                    style={{
                                        width: `${(ask.size / orderBook.asks[0].size) * 100}%`
                                    }}
                                />
                                <div className="relative grid grid-cols-3 px-4 py-1 text-sm">
                                    <div className="text-[#FF3B69]">{formatPrice(ask.price)}</div>
                                    <div className="text-left text-gray-300">{formatNumber(ask.size)}</div>
                                    <div className="text-right text-gray-300">{formatNumber(ask.total || 0)}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="px-4 py-2 border-y border-gray-800 text-sm">
                        <div className="flex justify-between text-gray-400">
                            <span>Spread</span>
                            <div>
                                <span>{orderBook.spread.toFixed(1)}</span>
                                <span className="ml-2">({((orderBook.spread / orderBook.lastPrice) * 100).toFixed(3)}%)</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        {orderBook.bids.slice(0, 11).map((bid, i) => (
                            <div key={`bid-${i}`} className="relative group">
                                <div
                                    className="absolute left-0 top-0 bottom-0 bg-green-900/20"
                                    style={{
                                        width: `${(bid.size / orderBook.bids[0].size) * 100}%`
                                    }}
                                />
                                <div className="relative grid grid-cols-3 px-4 py-1 text-sm">
                                    <div className="text-[#00B4C9]">{formatPrice(bid.price)}</div>
                                    <div className="text-left text-gray-300">{formatNumber(bid.size)}</div>
                                    <div className="text-right text-gray-300">{formatNumber(bid.total || 0)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    );
};

export default TradingTabs;