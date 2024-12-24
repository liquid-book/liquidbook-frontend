'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { TradingViewChart } from "./trading-view"
import { Settings, Maximize2, Camera } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { useTheme } from "next-themes"
import useCurrentTheme from "@/hooks/styles/theme"
import OrderBookComponent from "../order-book/order-book"
import TradingViewChart from "./trading-view"
import TradingViewWidget from "./trading-view"
import MarketDataWidget from "../market-widget/market-widget"

export default function TradingLayout() {
    const { setTheme } = useTheme();
    const currentTheme = useCurrentTheme();

    const changeTheme = () => {
        setTheme(currentTheme === "dark" ? "light" : "dark");
    };
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="border-b border-gray-800 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <img
                                src={currentTheme === "dark" ? "/logo.png" : "/logo-w.png"}
                                className="h-8"
                                alt="Liquid Book Logo"
                            />
                            <span className="text-xl font-bold">LIQUID BOOK</span>
                        </div>
                    </div>
                    {/* <Button variant="outline" className="text-white">
            Sign In
          </Button> */}
                </div>
            </header>

            <div className="w-full gap-4 px-4 pt-4">
                <MarketDataWidget />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-[1fr_300px] gap-4 px-4 pb-2">
                {/* Chart Section */}
                <div className="space-y-4">
                    <TradingViewWidget />
                </div>

                {/* Order Book */}
                <div className="space-y-4">
                    <Tabs defaultValue="order-book" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-gray-900 p-1">
                            <TabsTrigger
                                value="order-book"
                                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 hover:text-gray-200"
                            >
                                Order Book
                            </TabsTrigger>
                            <TabsTrigger
                                value="recent-trades"
                                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 hover:text-gray-200"
                            >
                                Recent Trades
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="order-book" className="mt-2 space-y-4">
                            <OrderBookComponent />
                        </TabsContent>
                        <TabsContent value="recent-trades" className="mt-2">
                            {/* Recent trades content will go here */}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-800 p-4">
                <Tabs defaultValue="positions" className="w-full">
                    <TabsList className="max-w-sm grid grid-cols-3 gap-x-2 bg-gray-900 p-1">
                        <TabsTrigger
                            value="positions"
                            className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 hover:text-gray-200"
                        >
                            Positions
                        </TabsTrigger>
                        <TabsTrigger
                            value="open-orders"
                            className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 hover:text-gray-200"
                        >
                            Open Orders
                        </TabsTrigger>
                        <TabsTrigger
                            value="trade-history"
                            className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 hover:text-gray-200"
                        >
                            Trade History
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="positions" className="py-4">
                        <div className="text-center text-gray-500">
                            Sign In to see your positions
                        </div>
                    </TabsContent>

                    <TabsContent value="open-orders" className="py-4">
                        <div className="text-center text-gray-500">
                            Sign In to see your open orders
                        </div>
                    </TabsContent>

                    <TabsContent value="trade-history" className="py-4">
                        <div className="text-center text-gray-500">
                            Sign In to see your trade history
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

