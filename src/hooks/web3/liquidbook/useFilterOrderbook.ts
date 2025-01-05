import { readContract } from '@wagmi/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { wagmiConfig } from '@/configs/wagmi';
import { BITMAP_ADDRESS } from '@/constants/contract-address';
import LiquidbookFilterABI from "@/abis/liquidbook/LiquidbookFilterABI";

interface UseFilterOrderbookOptions {
    debounceTime?: number;
    enabled?: boolean;
  }
  
  interface UseFilterOrderbookResult {
    bestBids: bigint[] | undefined;
    bestAsks: bigint[] | undefined;
    currentTick: bigint | undefined;
    loading: boolean;
    error: Error | null;
    refresh: () => Promise<void>;
    isStale: boolean;
  }
  
  export const useFilterOrderbook = (
    options: UseFilterOrderbookOptions = {}
  ): UseFilterOrderbookResult => {
    const { debounceTime = 1000, enabled = true } = options;
  
    const [bestBids, setBestBids] = useState<bigint[] | undefined>(undefined);
    const [bestAsks, setBestAsks] = useState<bigint[] | undefined>(undefined);
    const [currentTick, setCurrentTick] = useState<bigint | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [isStale, setIsStale] = useState(false);
  
    const debounceTimeRef = useRef(debounceTime);
  
    useEffect(() => {
      debounceTimeRef.current = debounceTime;
    }, [debounceTime]);
  
    const fetchOrderbookData = useCallback(async () => {
      if (!enabled) {
        setLoading(false);
        return;
      }
  
      setLoading(true);
      setError(null);
      setIsStale(false);
  
      try {
        // Fetch best bids (is_buy = true)
        const bids = await readContract(wagmiConfig, {
          address: BITMAP_ADDRESS,
          abi: LiquidbookFilterABI,
          functionName: 'topNBestTicks',
          args: [true],
        });
  
        // Fetch best asks (is_buy = false)
        const asks = await readContract(wagmiConfig, {
          address: BITMAP_ADDRESS,
          abi: LiquidbookFilterABI,
          functionName: 'topNBestTicks',
          args: [false],
        });
  
        // Fetch current tick
        const tick = await readContract(wagmiConfig, {
          address: BITMAP_ADDRESS,
          abi: LiquidbookFilterABI,
          functionName: 'getCurrentTick',
          args: [],
        });
  
        setBestBids(bids as bigint[]);
        setBestAsks(asks as bigint[]);
        setCurrentTick(tick as bigint);
      } catch (err: unknown) {
        const error = err instanceof Error
          ? err
          : new Error('Failed to fetch orderbook data');
  
        setError(error);
        console.error('Error fetching orderbook data:', error);
      } finally {
        setLoading(false);
      }
    }, [enabled]);
  
    const refresh = useCallback(async () => {
      await fetchOrderbookData();
    }, [fetchOrderbookData]);
  
    useEffect(() => {
      setIsStale(true);
    }, []);
  
    useEffect(() => {
      let intervalId: NodeJS.Timeout | null = null;
  
      if (enabled) {
        fetchOrderbookData();
        intervalId = setInterval(() => {
          refresh();
        }, 50000); // Poll every 50 seconds
      }
  
      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }, [fetchOrderbookData, refresh, enabled]);
  
    return {
      bestBids,
      bestAsks,
      currentTick,
      loading,
      error,
      refresh,
      isStale,
    };
  };
  
  // Example usage:
  /*
  const {
    bestBids,
    bestAsks,
    currentTick,
    loading,
    error,
    refresh,
    isStale
  } = useFilterOrderbook({
    debounceTime: 1000,
    enabled: true
  });
  */