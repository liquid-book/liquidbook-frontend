import React, { useState, useEffect, useCallback } from 'react';

// Types
interface Order {
  price: number;
  size: number;
  total: number;
  timestamp: number;
}

interface OrderBook {
  asks: Order[];
  bids: Order[];
  spread: number;
  lastUpdate: number;
}

type ViewType = 'both' | 'bids' | 'asks';
type DecimalPrecision = '0.001' | '0.01' | '0.1';

// Constants
const BASE_PRICE = 3521.50;
const ORDER_COUNT = 8;
const UPDATE_INTERVAL = 1000;
const PRICE_VOLATILITY = 0.0001;
const SIZE_MIN = 0.05;
const SIZE_MAX = 150;

// Helper functions moved outside component
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

const generateInitialOrderBook = (): OrderBook => {
  const asks: Order[] = Array.from({ length: ORDER_COUNT }, (_, i) => ({
    price: BASE_PRICE + (i * 0.01),
    size: SIZE_MIN,
    total: 0,
    timestamp: 0
  }));

  const bids: Order[] = Array.from({ length: ORDER_COUNT }, (_, i) => ({
    price: BASE_PRICE - ((i + 1) * 0.01),
    size: SIZE_MIN,
    total: 0,
    timestamp: 0
  }));

  const sortedAsks = calculateTotal(asks);
  const sortedBids = calculateTotal(bids);

  return {
    asks: sortedAsks,
    bids: sortedBids,
    spread: Number((sortedAsks[sortedAsks.length - 1].price - sortedBids[0].price).toFixed(2)),
    lastUpdate: 0
  };
};

const OrderBook: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [orderBook, setOrderBook] = useState<OrderBook>(generateInitialOrderBook());
  const [selectedDecimal, setSelectedDecimal] = useState<DecimalPrecision>('0.001');
  const [viewType, setViewType] = useState<ViewType>('both');
  const [isUpdating, setIsUpdating] = useState<boolean>(true);

  // Set mounted state after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  // Start updates only after component is mounted
  useEffect(() => {
    if (!mounted || !isUpdating) return;

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

      const sortedAsks = calculateTotal(newAsks.sort((a, b) => b.price - a.price));
      const sortedBids = calculateTotal(newBids.sort((a, b) => b.price - a.price));

      return {
        asks: sortedAsks,
        bids: sortedBids,
        spread: Number((sortedAsks[sortedAsks.length - 1].price - sortedBids[0].price).toFixed(2)),
        lastUpdate: Date.now()
      };
    };

    const interval = setInterval(() => {
      setOrderBook(prevBook => updateOrderBook(prevBook));
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [mounted, isUpdating]);

  const toggleView = useCallback(() => {
    const views: ViewType[] = ['both', 'bids', 'asks'];
    const currentIndex = views.indexOf(viewType);
    setViewType(views[(currentIndex + 1) % views.length]);
  }, [viewType]);

  const toggleUpdates = useCallback(() => {
    setIsUpdating(prev => !prev);
  }, []);

  const maxTotal = Math.max(
    ...orderBook.asks.map(a => a.total),
    ...orderBook.bids.map(b => b.total)
  );

  const totalBuyVolume = orderBook.bids.reduce((acc, bid) => acc + bid.size, 0);
  const totalSellVolume = orderBook.asks.reduce((acc, ask) => acc + ask.size, 0);
  const totalVolume = totalBuyVolume + totalSellVolume;
  const buyPercentage = (totalBuyVolume / totalVolume) * 100;
  const sellPercentage = (totalSellVolume / totalVolume) * 100;

  // Show static content during server-side rendering and initial mount
  if (!mounted) {
    return (
      <div className="h-[50vh] w-full flex justify-end items-start pt-8">
        <div className="bg-[#121212] text-white p-4 rounded-lg w-full max-w-sm">
          <div className="text-center py-4">Loading order book...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[50vh] w-full flex justify-end items-start pt-8">
      <div className="bg-[#121212] text-white p-4 rounded-lg w-full max-w-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <button 
              onClick={toggleView}
              className="bg-[#1E1E1E] p-2 rounded hover:bg-[#2A2A2A] transition-colors"
              title="Toggle View"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button 
              onClick={toggleUpdates}
              className={`bg-[#1E1E1E] p-2 rounded hover:bg-[#2A2A2A] transition-colors ${!isUpdating ? 'text-red-400' : ''}`}
              title={isUpdating ? 'Pause Updates' : 'Resume Updates'}
            >
              {isUpdating ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="6" y="4" width="4" height="16" fill="currentColor" />
                  <rect x="14" y="4" width="4" height="16" fill="currentColor" />
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polygon points="5,3 19,12 5,21" fill="currentColor" />
                </svg>
              )}
            </button>
          </div>
          <select 
            value={selectedDecimal}
            onChange={(e) => setSelectedDecimal(e.target.value as DecimalPrecision)}
            className="bg-[#1E1E1E] text-white px-3 py-1 rounded hover:bg-[#2A2A2A] transition-colors cursor-pointer"
          >
            <option value="0.01">0.01</option>
            <option value="0.1">0.1</option>
            <option value="1">1.0</option>
          </select>
        </div>

        {/* Column Headers */}
        <div className="grid grid-cols-2 mb-2 text-gray-400 text-sm">
          <div>Price</div>
          <div className="text-right">Size</div>
        </div>

        {/* Asks (Sell) Orders */}
        {(viewType === 'both' || viewType === 'asks') && (
          <div className="space-y-1">
            {orderBook.asks.map((ask, i) => (
              <div key={`ask-${i}`} className="relative group">
                <div 
                  className="absolute right-0 top-0 bottom-0 bg-red-900/40 transition-all duration-300"
                  style={{ width: `${(ask.total / maxTotal) * 100}%` }}
                />
                <div className="relative grid grid-cols-2 py-1 group-hover:bg-[#2A2A2A] transition-colors">
                  <div className="text-red-400">{ask.price.toFixed(2)}</div>
                  <div className="text-right text-gray-200">{ask.size.toFixed(6)}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Spread */}
        {viewType === 'both' && (
          <div className="text-gray-400 text-sm py-1">
            <div className="flex items-center">
              <span className="text-red-400">↓</span>
              <span className="ml-2">{orderBook.spread}% Spread</span>
            </div>
          </div>
        )}

        {/* Bids (Buy) Orders */}
        {(viewType === 'both' || viewType === 'bids') && (
          <div className="space-y-1">
            {orderBook.bids.map((bid, i) => (
              <div key={`bid-${i}`} className="relative group">
                <div 
                  className="absolute right-0 top-0 bottom-0 bg-green-900/40 transition-all duration-300"
                  style={{ width: `${(bid.total / maxTotal) * 100}%` }}
                />
                <div className="relative grid grid-cols-2 py-1 group-hover:bg-[#2A2A2A] transition-colors">
                  <div className="text-green-400">{bid.price.toFixed(2)}</div>
                  <div className="text-right text-gray-200">{bid.size.toFixed(6)}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Buy/Sell Distribution */}
        <div className="mt-4 h-2 flex rounded overflow-hidden">
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
        </div>
      </div>
    </div>
  );
};

export default OrderBook;