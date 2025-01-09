import React, { useState, useEffect, useCallback } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { useFilterOrderbook } from '@/hooks/web3/liquidbook/useFilterOrderbook';
import { LIQUIDBOOK_GRAPHQL_URL } from '@/constants/subgraph-url';
import { QueryResponse, TickData } from '@/types/web3/liquidbook/ticks';
import { tickss } from '@/graphql/liquidbook/liquidbook.query';

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

const STANDARD_ORDER_COUNT = 10;

const calculatePrice = (tick: string): number => {
  const result = Math.pow(1.0001, parseInt(tick));
  return result;
};

const processTicks = (ticks: TickData[], filteredTicks: bigint[] | undefined, isBuy: boolean): Order[] => {
  if (!filteredTicks || filteredTicks.length === 0) return [];

  // Convert filtered ticks to Set for O(1) lookup
  const filteredTicksSet = new Set(filteredTicks.map(tick => tick.toString()));

  const filtered = ticks
    .filter(tick => {
      return tick.is_buy === isBuy && filteredTicksSet.has(tick.tick);
    })
    .map(tick => ({
      price: calculatePrice(tick.tick),
      size: parseFloat(tick.volume) / 1e6,
      timestamp: parseInt(tick.timestamp)
    }))
    .sort((a, b) => isBuy ? a.price - b.price : b.price - a.price)
    .slice(0, STANDARD_ORDER_COUNT);

  let runningTotal = 0;
  return filtered.map(order => {
    runningTotal += order.size;
    return {
      ...order,
      total: runningTotal
    };
  });
};

const OrderBookComponent = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedDecimal, setSelectedDecimal] = useState<DecimalPrecision>('0.01');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [viewType, setViewType] = useState<ViewType>('both');

  // Get filtered ticks from the smart contract
  const {
    bestBids: filteredBids,
    bestAsks: filteredAsks,
    currentTick,
    loading: contractLoading,
    error: contractError,
    refresh: refreshContract
  } = useFilterOrderbook({
    debounceTime: 1000,
    enabled: true
  });

  // Query using tanstack/react-query for GraphQL data
  const { 
    data, 
    isLoading: graphqlLoading, 
    error: graphqlError, 
    refetch: refetchGraphQL 
  } = useQuery<QueryResponse>({
    queryKey: ['ticks'],
    queryFn: async () => {
      return await request(LIQUIDBOOK_GRAPHQL_URL, tickss);
    },
    refetchInterval: 1000,
    staleTime: 0,
  });

  const [orderBook, setOrderBook] = useState<OrderBook>({
    asks: [],
    bids: [],
    lastPrice: 0,
    spread: 0,
    lastUpdate: Date.now()
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Process data when either GraphQL data or filtered ticks change
  useEffect(() => {
    if (data?.tickss.items) {
      const asks = processTicks(data.tickss.items, filteredAsks, false);
      const bids = processTicks(data.tickss.items, filteredBids, true);

      const lowestAsk = asks[0]?.price || 0;
      const highestBid = bids[0]?.price || 0;
      
      setOrderBook({
        asks,
        bids,
        lastPrice: lowestAsk,
        spread: Number((lowestAsk - highestBid).toFixed(2)),
        lastUpdate: Date.now()
      });
    }
  }, [data, filteredAsks, filteredBids]);

  const formatPrice = (price: number): string => {
    const precision = parseFloat(selectedDecimal);
    const roundedPrice = Math.round(price / precision) * precision;
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5
    }).format(roundedPrice);
  };

  const toggleView = useCallback(() => {
    const views: ViewType[] = ['both', 'bids', 'asks'];
    const currentIndex = views.indexOf(viewType);
    setViewType(views[(currentIndex + 1) % views.length]);
  }, [viewType]);

  if (!mounted || graphqlLoading || contractLoading) {
    return <OrderBookSkeleton />;
  }

  if (graphqlError || contractError) {
    return (
      <div className="w-full bg-gray-900 text-white rounded-b-lg p-4">
        Error loading order book: {(graphqlError || contractError)?.toString()}
      </div>
    );
  }
  
    return (
      <div className="w-full bg-gray-900 text-white rounded-b-lg">
        <div className="flex items-center justify-between px-2 py-3 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <button onClick={toggleView}>
              <Menu className="w-4 h-4 text-gray-400" />
            </button>
          </div>
  
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 hover:bg-gray-800 rounded px-2 py-1 transition-colors duration-200 border border-gray-800"
            >
              <span className="text-xs">{selectedDecimal}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-gray-800 rounded shadow-lg z-50">
                {['0.01', '0.1', '1'].map((option) => (
                  <button
                    key={option}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-gray-700 transition-colors duration-200"
                    onClick={() => {
                      setSelectedDecimal(option as DecimalPrecision);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
  
        <div className="px-0 py-2">
          <div className="grid grid-cols-3 px-2 py-1 text-xs text-gray-400">
            <div>Price</div>
            <div className="text-center">Size</div>
            <div className="text-right">Total</div>
          </div>
  
          {(viewType === 'both' || viewType === 'asks') && (
            <div className="flex flex-col-reverse space-y-[5px] space-y-reverse">
              {orderBook.asks.map((ask, i) => (
                <div key={`ask-${i}`} className="relative group">
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-[#FF6978] bg-opacity-20"
                    style={{
                      width: `${(ask.total || 0) / Math.max(...orderBook.asks.map(a => a.total || 0)) * 100}%`
                    }}
                  />
                  <div className="relative grid grid-cols-3 px-2 py-[2px] text-xs">
                    <div className="text-[#FF6978]">{formatPrice(ask.price)}</div>
                    <div className="text-center text-gray-300">{ask.size.toLocaleString(undefined, {
                      minimumFractionDigits: 6,
                      maximumFractionDigits: 6
                    })}</div>
                    <div className="text-right text-gray-300">{(ask.total || 0).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
  
          {viewType === 'both' && (
            <div className="px-2 py-1 my-[5px] border-y border-gray-800 text-xs bg-gray-800">
              <div className="flex justify-between text-white">
                <span>Spread</span>
                <span>{orderBook.spread}</span>
              </div>
            </div>
          )}
  
          {(viewType === 'both' || viewType === 'bids') && (
            <div className="space-y-[5px]">
              {orderBook.bids.map((bid, i) => (
                <div key={`bid-${i}`} className="relative group">
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-green-900/20"
                    style={{
                      width: `${(bid.total || 0) / Math.max(...orderBook.bids.map(b => b.total || 0)) * 100}%`
                    }}
                  />
                  <div className="relative grid grid-cols-3 px-2 py-[2px] text-xs">
                    <div className="text-green-400">{formatPrice(bid.price)}</div>
                    <div className="text-center text-gray-300">{bid.size.toLocaleString(undefined, {
                      minimumFractionDigits: 6,
                      maximumFractionDigits: 6
                    })}</div>
                    <div className="text-right text-gray-300">{(bid.total || 0).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const OrderBookSkeleton = () => {
    return (
      <div className="w-full h-[615px] bg-gray-900 text-white rounded-b-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-2 py-3 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-800 rounded" />
          </div>
          <div className="w-16 h-6 bg-gray-800 rounded" />
        </div>
  
        {/* Column Headers */}
        <div className="h-[calc(620px-48px)] flex flex-col px-0 py-2">
          <div className="grid grid-cols-3 px-2 py-1">
            <div className="w-12 h-3 bg-gray-800 rounded" />
            <div className="w-12 h-3 bg-gray-800 rounded justify-self-center" />
            <div className="w-12 h-3 bg-gray-800 rounded justify-self-end" />
          </div>
  
          {/* Asks */}
          <div className="flex-1 flex flex-col-reverse space-y-[5px] space-y-reverse">
            {[...Array(10)].map((_, i) => (
              <div key={`ask-${i}`} className="grid grid-cols-3 px-2 py-[2px]">
                <div className="w-20 h-3 bg-gray-800/50 rounded" />
                <div className="w-20 h-3 bg-gray-800/50 rounded justify-self-center" />
                <div className="w-16 h-3 bg-gray-800/50 rounded justify-self-end" />
              </div>
            ))}
          </div>
  
          {/* Spread */}
          <div className="px-2 py-1 my-[5px] border-y border-gray-800 bg-gray-800">
            <div className="flex justify-between">
              <div className="w-12 h-3 bg-gray-700 rounded" />
              <div className="w-16 h-3 bg-gray-700 rounded" />
            </div>
          </div>
  
          {/* Bids */}
          <div className="flex-1 space-y-[5px]">
            {[...Array(10)].map((_, i) => (
              <div key={`bid-${i}`} className="grid grid-cols-3 px-2 py-[2px]">
                <div className="w-20 h-3 bg-gray-800/50 rounded" />
                <div className="w-20 h-3 bg-gray-800/50 rounded justify-self-center" />
                <div className="w-16 h-3 bg-gray-800/50 rounded justify-self-end" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default OrderBookComponent;