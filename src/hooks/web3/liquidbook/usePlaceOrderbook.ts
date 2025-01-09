import { writeContract } from '@wagmi/core';
import { useCallback, useState } from 'react';
import { wagmiConfig } from '@/configs/wagmi';
import { TransactionReceipt, decodeEventLog, Log } from 'viem';
import { ENGINE_ADDRESS } from '@/constants/contract-address';
import PlaceOrderABI from "@/abis/liquidbook/PlaceOrderABI";
import { waitForTransaction } from '@wagmi/core';

interface PlaceOrderParams {
  tick: bigint;
  volume: bigint;
  user: `0x${string}`;
  isBuy: boolean;
  isMarket: boolean;
}

export interface PlaceOrderResult {
  orderIndex: bigint;
  executedTick: bigint;
  remainingVolume: bigint;
  receipt: TransactionReceipt;
}

interface PlaceOrderEvent {
  user: `0x${string}`;
  tick: bigint;
  orderIndex: bigint;
  isBuy: boolean;
  isMarket: boolean;
  volume: bigint;
  remainingVolume: bigint;
}

interface UsePlaceOrderOptions {
  onSuccess?: (result: PlaceOrderResult) => void;
  onError?: (error: Error) => void;
}

interface UsePlaceOrderReturn {
  placeOrder: (params: PlaceOrderParams) => Promise<PlaceOrderResult>;
  isPlacing: boolean;
  error: Error | null;
}

export const usePlaceOrder = (
  options: UsePlaceOrderOptions = {}
): UsePlaceOrderReturn => {
  const { onSuccess, onError } = options;
  const [isPlacing, setIsPlacing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const placeOrder = useCallback(
    async ({
      tick,
      volume,
      user,
      isBuy,
      isMarket,
    }: PlaceOrderParams): Promise<PlaceOrderResult> => {
      setIsPlacing(true);
      setError(null);

      try {
        // Place the order and get transaction hash
        const hash = await writeContract(wagmiConfig, {
          address: ENGINE_ADDRESS,
          abi: PlaceOrderABI,
          functionName: 'placeOrder',
          args: [tick, volume, user, isBuy, isMarket],
        });

        // Wait for transaction to be mined using wagmi's waitForTransaction
        const receipt = await waitForTransaction(wagmiConfig, {
          hash,
        });

        // Find and decode the PlaceOrder event
        const placeOrderLog = receipt.logs.find((log: Log) => {
          try {
            const event = decodeEventLog({
              abi: PlaceOrderABI,
              data: log.data,
              topics: log.topics,
            });
            return event.eventName === 'PlaceOrder';
          } catch {
            return false;
          }
        });

        if (!placeOrderLog) {
          throw new Error('PlaceOrder event not found in transaction logs');
        }

        // Decode the event data
        const event = decodeEventLog({
          abi: PlaceOrderABI,
          data: placeOrderLog.data,
          topics: placeOrderLog.topics,
        }) as unknown as PlaceOrderEvent;

        // Construct the result object
        const orderResult: PlaceOrderResult = {
          orderIndex: event.orderIndex,
          executedTick: event.tick,
          remainingVolume: event.remainingVolume,
          receipt,
        };

        onSuccess?.(orderResult);
        return orderResult;
      } catch (err: unknown) {
        const error =
          err instanceof Error
            ? err
            : new Error('Failed to place order');

        setError(error);
        onError?.(error);
        throw error;
      } finally {
        setIsPlacing(false);
      }
    },
    [onSuccess, onError]
  );

  return {
    placeOrder,
    isPlacing,
    error,
  };
};

// Example usage:
/*
const {
  placeOrder,
  isPlacing,
  error
} = usePlaceOrder({
  onSuccess: (result) => {
    console.log('Order placed successfully:', result);
    console.log('Order index:', result.orderIndex.toString());
    console.log('Executed tick:', result.executedTick.toString());
    console.log('Remaining volume:', result.remainingVolume.toString());
  },
  onError: (error) => {
    console.error('Error placing order:', error);
  }
});

// Place an order
try {
  const result = await placeOrder({
    tick: BigInt(1000),
    volume: BigInt(100000),
    user: '0x...',
    isBuy: true,
    isMarket: false
  });
} catch (error) {
  console.error('Failed to place order:', error);
}
*/