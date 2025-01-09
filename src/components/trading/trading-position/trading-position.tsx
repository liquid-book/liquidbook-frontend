'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ChevronDown, Filter } from 'lucide-react'
import OrderHistoryTable from "./order-history"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConnectButton } from "@rainbow-me/rainbowkit"

const queryClient = new QueryClient();

export default function TradingPosition() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="pb-4 text-white">
        {/* Main Layout */}
        <div className="flex px-[2px]">
          {/* Left Content Area */}
          <div className="flex-1 p-2 bg-gray-900 rounded-lg">
            {/* Navigation Tabs */}
            <div className="flex justify-between items-center mb-4 ">
              <Tabs defaultValue="positions" className="w-full">
                <div className="flex justify-between items-center w-full">
                  <TabsList className="bg-transparent border-none">
                    <TabsTrigger
                      value="balances"
                      className="flex px-3 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#0064A7] data-[state=active]:text-white text-gray-400"
                    >
                      Balances
                    </TabsTrigger>
                    <TabsTrigger
                      value="positions"
                      className="flex px-3 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#0064A7] data-[state=active]:text-white text-gray-400"
                    >
                      Positions
                    </TabsTrigger>
                    <TabsTrigger
                      value="open-orders"
                      className="flex px-3 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#0064A7] data-[state=active]:text-white text-gray-400"
                    >
                      Open Orders
                    </TabsTrigger>
                    <TabsTrigger
                      value="twap"
                      className="flex px-3 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#0064A7] data-[state=active]:text-white text-gray-400"
                    >
                      TWAP
                    </TabsTrigger>
                    <TabsTrigger
                      value="trade-history"
                      className="flex px-3 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#0064A7] data-[state=active]:text-white text-gray-400"
                    >
                      Trade History
                    </TabsTrigger>
                    <TabsTrigger
                      value="funding-history"
                      className="flex px-3 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#0064A7] data-[state=active]:text-white text-gray-400"
                    >
                      Funding History
                    </TabsTrigger>
                    <TabsTrigger
                      value="order-history"
                      className="flex px-3 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#0064A7] data-[state=active]:text-white text-gray-400"
                    >
                      Order History
                    </TabsTrigger>
                  </TabsList>
                  <Button variant="ghost" size="sm" className="text-gray-400">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>

                {/* Tab Contents */}
                <TabsContent value="positions" className="">
                  <div className="w-full">
                    <div className="grid grid-cols-9 gap-4 px-4 py-2 text-sm text-gray-400">
                      <div>Coin</div>
                      <div>Size</div>
                      <div className="flex items-center">
                        Position Value
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </div>
                      <div>Entry Price</div>
                      <div>Mark Price</div>
                      <div className="underline">PNL (ROE %)</div>
                      <div>Liq. Price</div>
                      <div className="underline">Margin</div>
                      <div className="underline">Funding</div>
                    </div>
                    <div className="px-4 py-8 text-gray-400 text-sm text-center">
                      No open positions yet
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="order-history">
                  <OrderHistoryTable />
                </TabsContent>

                <TabsContent value="balances">
                  <div className="px-4 py-8 text-gray-400 text-sm text-center">No balances to display</div>
                </TabsContent>

                <TabsContent value="open-orders">
                  <div className="px-4 py-8 text-gray-400 text-sm text-center">No open orders</div>
                </TabsContent>

                <TabsContent value="twap">
                  <div className="px-4 py-8 text-gray-400 text-sm text-center">No TWAP orders</div>
                </TabsContent>

                <TabsContent value="trade-history">
                  <div className="px-4 py-8 text-gray-400 text-sm text-center">No trade history</div>
                </TabsContent>

                <TabsContent value="funding-history">
                  <div className="px-4 py-8 text-gray-400 text-sm text-center">No funding history</div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-[300px] ml-[2px] bg-gray-900 rounded-lg border-l border-gray-800 p-4">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-400 mb-2">
                Connect your wallet to start trading with zero gas.
              </p>
              <div className="flex justify-center [&_button]:!bg-[#0064A7] [&_button]:hover:!bg-[#0064A7]/80">
                <ConnectButton />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Account Equity</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Spot</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 underline">Perps</span>
                    <span>$0.00</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Perps Overview</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 underline">Balance</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Unrealized PNL</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 underline">Cross Margin Ratio</span>
                    <span>0.00%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Maintenance Margin</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 underline">Cross Account Leverage</span>
                    <span>0.00x</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  )
}