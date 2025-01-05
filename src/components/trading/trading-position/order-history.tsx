import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { LIQUIDBOOK_GRAPHQL_URL } from '@/constants/subgraph-url';
import { placeOrderEventss } from '@/graphql/liquidbook/liquidbook.query';
import { OrderHistoryResponse } from '@/types/web3/liquidbook/orderHistory';
import { calculatePrice, formatAddress, formatDate } from '../../../../helper';

// Helper functions
// const calculatePrice = (tick: string): number => {
//   return Math.pow(1.0001, parseInt(tick));
// };

// const formatDate = (timestamp: string): string => {
//   return new Date(parseInt(timestamp) * 1000).toLocaleString();
// };

// const formatAddress = (address: string): string => {
//   return `${address.slice(0, 6)}...${address.slice(-4)}`;
// };

const OrderHistoryTable = () => {
  type SortDirection = 'asc' | 'desc';
  type SortableKey = 'timestamp' | 'volume' | 'price';
  
  const [sortConfig, setSortConfig] = useState<{ key: SortableKey; direction: SortDirection }>({
    key: 'timestamp',
    direction: 'desc'
  });

  // Query using tanstack/react-query
  const { data, isLoading, error, refetch } = useQuery<OrderHistoryResponse>({
    queryKey: ['orderHistory'],
    queryFn: async () => {
      return await request(LIQUIDBOOK_GRAPHQL_URL, placeOrderEventss);
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });

  const handleSort = (key: SortableKey) => {
    setSortConfig(prevConfig => ({
      key: key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  if (isLoading) {
    return (
      <div className="px-4 py-8 text-gray-400 text-sm text-center">
        Loading order history...
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-8 text-red-400 text-sm text-center">
        Error loading order history: {error.toString()}
      </div>
    );
  }

  const orders = data?.placeOrderEventss.items || [];

  const sortedOrders = [...orders].sort((a, b) => {
    const key = sortConfig.key as SortableKey;
    
    if (key === 'timestamp' || key === 'volume') {
      const aValue = parseFloat(a[key].toString());
      const bValue = parseFloat(b[key].toString());
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    if (key === 'price') {
      const aValue = calculatePrice(a.tick);
      const bValue = calculatePrice(b.tick);
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  return (
    <div className="w-full">
      <div className="grid grid-cols-8 gap-4 px-4 py-2 text-sm text-gray-400">
        <div className="cursor-pointer flex items-center" onClick={() => handleSort('timestamp')}>
          Time
          <ChevronDown className="h-4 w-4 ml-1" />
        </div>
        <div>Type</div>
        <div>Side</div>
        <div className="cursor-pointer flex items-center" onClick={() => handleSort('price')}>
          Price
          <ChevronDown className="h-4 w-4 ml-1" />
        </div>
        <div className="cursor-pointer flex items-center" onClick={() => handleSort('volume')}>
          Amount
          <ChevronDown className="h-4 w-4 ml-1" />
        </div>
        <div>Filled</div>
        <div>Status</div>
        <div>User</div>
      </div>

      {sortedOrders.length > 0 ? (
        sortedOrders.map((order) => (
          <div key={order.id} className="grid grid-cols-8 gap-4 px-4 py-2 text-sm border-t border-gray-800">
            <div className="text-gray-400">{formatDate(order.timestamp)}</div>
            <div className="text-gray-400">{order.is_market ? 'Market' : 'Limit'}</div>
            <div className={order.is_buy ? 'text-green-500' : 'text-red-500'}>
              {order.is_buy ? 'Buy' : 'Sell'}
            </div>
            <div className="text-white">${calculatePrice(order.tick).toFixed(2)}</div>
            <div className="text-white">{(Number(order.volume) / 1e6).toFixed(2)}</div>
            <div className="text-white">
              {((Number(order.volume) - Number(order.remaining_volume)) / Number(order.volume) * 100).toFixed(1)}%
            </div>
            <div className="text-gray-400">
              {Number(order.remaining_volume) === 0 ? 'Filled' : 'Open'}
            </div>
            <div className="text-gray-400">{formatAddress(order.user)}</div>
          </div>
        ))
      ) : (
        <div className="px-4 py-8 text-gray-400 text-sm text-center">
          No orders found
        </div>
      )}
    </div>
  );
};

export default OrderHistoryTable;