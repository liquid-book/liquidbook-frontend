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

            {/* Main Content */}
            <div className="grid grid-cols-[1fr_300px] gap-4 p-4">
                {/* Chart Section */}
                <div className="space-y-4">
                    <TradingViewWidget />
                </div>

                {/* Order Book */}
                <div className="space-y-4">
                    <Tabs defaultValue="order-book" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="order-book">Order Book</TabsTrigger>
                            <TabsTrigger value="recent-trades">Recent Trades</TabsTrigger>
                        </TabsList>
                        <TabsContent value="order-book" className="space-y-4">
                            <OrderBookComponent />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-800 p-4">
                <Tabs defaultValue="positions" className="w-full">
                    <TabsList>
                        <TabsTrigger value="positions">Positions</TabsTrigger>
                        <TabsTrigger value="open-orders">Open Orders</TabsTrigger>
                        <TabsTrigger value="trade-history">Trade History</TabsTrigger>
                    </TabsList>
                    <TabsContent value="positions" className="py-4">
                        <div className="text-center text-gray-500">
                            Sign In to see your positions
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

