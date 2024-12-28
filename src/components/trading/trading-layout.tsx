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
import RecentTradesComponent from "../recent-trade/recent-trade"

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
                            <RecentTradesComponent/>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-800 p-4 ">
                <Tabs defaultValue="positions" className="w-full bg-gray-900 p-4 rounded-xl border border-gray-800">
                    <TabsList className="relative w-full flex justify-start space-x-12 pl-6 border-b border-gray-800 bg-transparent">
                        <TabsTrigger
                            value="positions"
                            className="relative px-1 pb-3 text-sm font-medium text-gray-400 hover:text-gray-200 data-[state=active]:text-white transition-colors
                       after:absolute after:bottom-[-1px] after:left-0 after:h-[2px] after:w-full 
                       after:scale-x-0 data-[state=active]:after:scale-x-100
                       after:bg-gradient-to-r after:from-[#0064A7] after:to-[#00416C]
                       after:transition-transform after:duration-300"
                        >
                            Positions
                        </TabsTrigger>
                        <TabsTrigger
                            value="open-orders"
                            className="relative px-1 pb-3 text-sm font-medium text-gray-400 hover:text-gray-200 data-[state=active]:text-white transition-colors
                       after:absolute after:bottom-[-1px] after:left-0 after:h-[2px] after:w-full 
                       after:scale-x-0 data-[state=active]:after:scale-x-100
                       after:bg-gradient-to-r after:from-[#0064A7] after:to-[#00416C]
                       after:transition-transform after:duration-300"
                        >
                            Open Orders
                        </TabsTrigger>
                        <TabsTrigger
                            value="trade-history"
                            className="relative px-1 pb-3 text-sm font-medium text-gray-400 hover:text-gray-200 data-[state=active]:text-white transition-colors
                       after:absolute after:bottom-[-1px] after:left-0 after:h-[2px] after:w-full 
                       after:scale-x-0 data-[state=active]:after:scale-x-100
                       after:bg-gradient-to-r after:from-[#0064A7] after:to-[#00416C]
                       after:transition-transform after:duration-300"
                        >
                            Trade History
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="positions" className="py-8">
                        <div className="flex items-center justify-center space-x-2 text-gray-400">
                            <span className="text-[#0064A7] hover:text-[#00416C] transition-colors cursor-pointer">
                                Sign In
                            </span>
                            <span>to see your positions</span>
                        </div>
                    </TabsContent>

                    <TabsContent value="open-orders" className="py-8">
                        <div className="flex items-center justify-center space-x-2 text-gray-400">
                            <span className="text-[#0064A7] hover:text-[#00416C] transition-colors cursor-pointer">
                                Sign In
                            </span>
                            <span>to see your open orders</span>
                        </div>
                    </TabsContent>

                    <TabsContent value="trade-history" className="py-8">
                        <div className="flex items-center justify-center space-x-2 text-gray-400">
                            <span className="text-[#0064A7] hover:text-[#00416C] transition-colors cursor-pointer">
                                Sign In
                            </span>
                            <span>to see your trade history</span>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

