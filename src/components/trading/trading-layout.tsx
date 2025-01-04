'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Settings, Maximize2, Camera } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { useTheme } from "next-themes"
import useCurrentTheme from "@/hooks/styles/theme"
import OrderBookComponent from "../order-book/order-book"
import TradingViewChart from "./trading-view"
import TradingViewWidget from "./trading-view"
import MarketDataWidget from "../market-widget/market-widget"
import RecentTradesComponent from "../recent-trade/recent-trade"
import TradingPosition from "./trading-position"
import BuyAndSell from "../market/buy-and-sell"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from "wagmi"

export default function TradingLayout() {
    const { setTheme } = useTheme();
    const currentTheme = useCurrentTheme();


  const { connectors, connect } = useConnect();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

    const changeTheme = () => {
        setTheme(currentTheme === "dark" ? "light" : "dark");
    };
    return (
        <div className="min-h-screen bg-[#303030] text-white">
            <header className="border-b border-gray-800 px-2 py-3 bg-[#111827]">
                <div className="flex items-center justify-between">
                    <div className="w-full flex items-center justify-between space-x-2">
                        <div className="flex items-center space-x-1">
                            <img
                                src={"/logo.png"}
                                className="h-8"
                                alt="Liquid Book Logo"
                            />
                            <span className="text-xl font-bold pl-1">LIQUID BOOK</span>
                        </div>
                        <ConnectButton />
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-[1fr_300px_300px] gap-[3px] px-[2px] py-[3px]">
                <div className="space-y-[3px]">
                    <MarketDataWidget />
                    <TradingViewWidget />
                </div>

                <div className="space-y-2">
                    <Tabs defaultValue="order-book" className="w-full">
                        <TabsList className="flex rounded-t-lg w-full bg-[#111827] border-b border-[#303030]">
                            <TabsTrigger
                                value="order-book"
                                className="flex-1 py-2 text-base data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#0064A7] text-gray-400 hover:text-gray-200"
                            >
                                Order Book
                            </TabsTrigger>
                            <TabsTrigger
                                value="recent-trades"
                                className="flex-1 py-2 text-base data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#0064A7] text-gray-400 hover:text-gray-200"
                            >
                                Trades
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="order-book" className="mt-0">
                            <OrderBookComponent />
                        </TabsContent>
                        <TabsContent value="recent-trades" className="mt-0">
                            <RecentTradesComponent />
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="space-y-2">
                    <Tabs defaultValue="market" className="w-full">
                        <TabsList className="flex rounded-t-lg w-full bg-[#111827] border-b border-[#303030]">
                            <TabsTrigger
                                value="market"
                                className="flex-1 py-2 text-base data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#0064A7] text-gray-400 hover:text-gray-200"
                            >
                                Market
                            </TabsTrigger>
                            <TabsTrigger
                                value="limit"
                                className="flex-1 py-2 text-base data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#0064A7] text-gray-400 hover:text-gray-200"
                            >
                                Limit
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="market" className="mt-0">
                            {BuyAndSell('market')}
                        </TabsContent>
                        <TabsContent value="limit" className="mt-0">
                            {BuyAndSell('limit')}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>


            <TradingPosition />
        </div>
    )
}

// testing