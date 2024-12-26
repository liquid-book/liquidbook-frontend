import { useEffect, useState } from "react";

const RecentTradesSkeleton = () => {
    return (
        <div className="w-full max-w-xs mx-auto bg-gray-900 rounded-xl border border-gray-800 text-white p-4 animate-pulse">

        </div>
    );
};

function formatTime(timestamp: number): string {
    const date = new Date(timestamp);        
    return date.toTimeString().split(' ')[0];
}

const formatPrice = (price: number): string => {
    const precision = 0.01;
    return (Math.round(price / precision) * precision).toFixed(2);
};

const RecentTradesComponent = () => {
    interface Trades {
        price: number;
        time: number;
        size: number;
        side: 'Buy' | 'Sell';
        total?: number;
    }

    const [mounted, setMounted] = useState(false);
    const [trades, setTrades] = useState<Trades[]>([]);

    const calculateTotal = (orders: Trades[]): Trades[] => {
        let runningTotal = 0;
        return orders.map(order => {
            runningTotal = order.size;
            return { ...order, total: runningTotal };
        });
    };

    useEffect(() => {
        setMounted(true);
    }, []);
        
    useEffect(() => {
        if (!mounted) return;

        const fetchTrades = async() => {
            try {
                const response = await fetch('https://www.okx.com//api/v5/market/trades?instId=ETH-USDC&limit=20');
                const data = await response.json();
                console.log(data);
                
                if (data.data) {
                    const tradesList = data.data;

                    const newTrade : Trades[] = tradesList.map((trade : any) => ({
                        price: parseFloat(trade.px),
                        size: parseFloat(trade.sz),
                        side: trade.side === 'buy' ? 'Buy' : 'Sell',
                        time: formatTime(parseFloat(trade.ts)),
                    }));

                    setTrades(calculateTotal(newTrade));
                }
            } catch (error) {
                console.error('Error fetching trades: ', error);
            }
        }

        const interval = setInterval(fetchTrades, 1000);
        fetchTrades();

        return () => clearInterval(interval);
    }, [mounted]);    

    return (
        <div className="w-full max-w-xs mx-auto bg-gray-900 rounded-xl border border-gray-800 text-white p-4">
            <div className="flex flex-col h-[482px] rounded-lg overflow-hidden">
                <div className="sticky top-0 z-10">
                    <div className="grid grid-cols-3 mb-2 text-gray-400 text-sm">
                        <div>Price</div>
                        <div className="text-center">Time</div>
                        <div className="text-right">Size</div>
                    </div>
                </div>
                <div className="overflow-auto [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar-track]:bg-gray-900">
                    <div className="flex flex-col space-y-1">
                        {trades.map((trade, i) => (
                            <div key={i} className="relative group">
                                <div 
                                    className={`absolute left-0 top-0 bottom-0 ${trade.side === 'Buy' ? 'bg-green-900/40' : 'bg-red-900/40'}`} 
                                    style={{width: `${(trade.total || 0) / Math.max(...trades.map(b => b.total || 0)) * 100}%`}}
                                />
                                <div className="relative grid grid-cols-3 py-1 group-hover:bg-gray-800 text-xs font-light">
                                    <div className={`${trade.side === 'Buy' ? 'text-green-400' : 'text-red-400'}`}>{formatPrice(trade.price)}</div>
                                    <div className="text-center">{trade.time}</div>
                                    <div className="text-right">{trade.size.toFixed(6)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentTradesComponent;