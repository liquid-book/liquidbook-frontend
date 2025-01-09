"use client";

import { useEffect, useState } from "react";
import { Slider } from "../../ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { PlaceOrderResult, usePlaceOrder } from "@/hooks/web3/liquidbook/usePlaceOrderbook";
import { ConnectButton } from "@rainbow-me/rainbowkit";

// Custom hook to handle client-side rendering
const useIsClient = () => {
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
      setIsClient(true);
    }, []);
    
    return isClient;
  };

interface BuyAndSellProps {
  type: 'market' | 'limit';
}

const BuyAndSellComponent = ({ type, side }: { type: string; side: 'buy' | 'sell' }) => {
    const [percentage, setPercentage] = useState([0]);
    const [price, setPrice] = useState<string>('');
    const [size, setSize] = useState<string>('');
    const [token, setToken] = useState<'usdc' | 'liq'>('usdc');
    const { address } = useAccount();
    const isClient = useIsClient();
    
    const { placeOrder, isPlacing } = usePlaceOrder({
        onSuccess: (result: PlaceOrderResult) => {
            toast.success('Order placed successfully', {
                description: `Order index: ${result.orderIndex.toString()}`
            });
            setPrice('');
            setSize('');
            setPercentage([0]);
        },
        onError: (error: Error) => {
            toast.error('Failed to place order', {
                description: error.message
            });
        }
    });

    if (!isClient) {
        return null; // Return null on server-side
    }

    const handleSubmit = async () => {
        if (!address) {
            toast.error('Please connect your wallet');
            return;
        }

        if (type === 'limit' && !price) {
            toast.error('Please enter a price');
            return;
        }

        if (!size) {
            toast.error('Please enter a size');
            return;
        }

        try {
            const orderPrice = type === 'limit' ? BigInt(Math.floor(parseFloat(price) * 1e6)) : BigInt(0);
            const orderSize = BigInt(Math.floor(parseFloat(size) * 1e6));

            await placeOrder({
                tick: orderPrice,
                volume: orderSize,
                user: address,
                isBuy: side === 'buy',
                isMarket: type === 'market'
            });
        } catch (error) {
            console.error('Order placement error:', error);
        }
    };

    const handlePercentageChange = (newValue: number[]) => {
        setPercentage(newValue);
        // TODO: Calculate size based on available balance and percentage
    };

    return (
        <div className="w-full bg-gray-900 rounded-b-lg text-white p-4 relative">
    <div
        className={`${!address ? "opacity-20 pointer-events-none" : "opacity-100"}`}
    >
        <div className="flex flex-col justify-between h-[510px]">
            <div className="flex flex-col gap-2 w-full py-2">
                <div className="flex flex-row justify-between">
                    <span className="text-gray-400 text-xs">Available To Trade</span>
                    <span className="text-white text-xs">0.00 USDC</span>
                </div>
                <div className={`${type === 'limit' ? 'flex flex-row' : 'hidden'} w-full border rounded-lg px-2 py-1`}>
                    <span className="text-gray-400 text-sm mr-2 inline-block w-32">Price (USD)</span>
                    <input 
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.00"
                        className="w-full text-right bg-transparent outline-none text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                    />
                </div>
                <div className="flex flex-row w-full border rounded-lg px-2 py-1">
                    <span className="text-gray-400 text-sm mr-2">Size</span>
                    <input 
                        type="number"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        placeholder="0.00"
                        className="w-full text-right bg-transparent outline-none text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                    />
                    <select 
                        value={token}
                        onChange={(e) => setToken(e.target.value as 'usdc' | 'liq')}
                        className="outline-none bg-transparent text-sm"
                    >
                        <option value="usdc" className="bg-[#222428] outline-none text-sm">USDC</option>
                        <option value="liq" className="bg-[#222428] outline-none text-sm">LIQ</option>
                    </select>
                </div>
                <div className="flex w-full gap-2">
                    <Slider
                        defaultValue={percentage}
                        max={100}
                        step={1}
                        className="flex-1 w-full"
                        onValueChange={handlePercentageChange}
                    />
                    <div className="flex flex-row border rounded-lg w-16 justify-between px-2 py-1">
                        <input 
                            type="number"
                            max={100}
                            value={percentage[0]}
                            onChange={(e) => setPercentage([Number(e.target.value)])}
                            className="w-6 outline-none bg-transparent text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span>%</span>
                    </div>
                </div>
            </div>
            <div>
                <button 
                    onClick={handleSubmit}
                    disabled={isPlacing}
                    className={`w-full text-center text-base font-semibold mt-2 py-2 ${
                        side === 'buy' 
                            ? 'bg-[#0064A7] hover:opacity-80' 
                            : 'bg-[#B8303E] hover:opacity-80'
                    } rounded-lg ${isPlacing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isPlacing ? 'Placing Order...' : side === 'buy' ? 'Buy' : 'Sell'}
                </button>
                <div className="flex flex-col gap-2 border-t-2 mt-2 py-2">
                    <div className="flex flex-row justify-between text-gray-300 text-xs">
                        <span className="font-normal">Order Value</span>
                        <span className="font-normal">
                            {price && size ? `${(parseFloat(price) * parseFloat(size)).toFixed(2)} USD` : 'N/A'}
                        </span>
                    </div>
                    <div className="flex flex-row justify-between text-gray-300 text-xs">
                        <span className="font-normal">Fees</span>
                        <span className="font-normal">0.0350% / 0.0100%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {!address && (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="[&_button]:!bg-[#0064A7] [&_button]:hover:!bg-[#0064A7]/80">
                <ConnectButton />
            </div>
        </div>
    )}
</div>
    );
};

export default function BuyAndSell({ type }: BuyAndSellProps) {
    const isClient = useIsClient();

    if (!isClient) {
        return null; // Return null on server-side
    }
    return (
        <div className="w-full bg-gray-900 rounded-b-lg text-white p-4">
            <Tabs defaultValue="buy" className="w-full">
                <TabsList className="flex w-full rounded-lg p-1 border border-[#474747] bg-[#222428]">
                    <TabsTrigger 
                        value="buy"
                        className="flex-1 py-2 data-[state=active]:bg-[#0064A7] rounded-[4px] data-[state=active]:text-white text-xs font-bold p-1 text-gray-400 hover:text-gray-200 px-2"
                    >
                        Buy
                    </TabsTrigger>
                    <TabsTrigger 
                        value="sell"
                        className="flex-1 py-2 data-[state=active]:bg-[#B8303E] rounded-[4px] data-[state=active]:text-white text-xs font-bold p-1 text-gray-400 hover:text-gray-200 px-2"    
                    >
                        Sell
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="buy">
                    <BuyAndSellComponent type={type} side="buy" />
                </TabsContent>
                <TabsContent value="sell">
                    <BuyAndSellComponent type={type} side="sell" />
                </TabsContent>
            </Tabs>
        </div>
    );
}