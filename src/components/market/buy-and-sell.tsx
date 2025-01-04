import { useState } from "react";
import { Slider } from "../ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

const BuyAndSellComponent = (type : string, side : string) => {
    const [value, setValue] = useState([0]);

    return (
        <div className="flex flex-col justify-between h-[541px]">
            <div className="flex flex-col gap-2 w-full py-2">
                <div className="flex flex-row justify-between">
                    <span className="text-gray-400 text-xs">Available To Trade</span>
                    <span className="text-white text-xs">0.00 USDC</span>
                </div>
                <div className={`${type == 'limit' ? 'flex flex-row' : 'hidden'} w-full border rounded-lg px-2 py-1`}>
                    <span className="text-gray-400 text-sm mr-2 inline-block w-32">Price (USD)</span>
                    <input type="number" className="w-full text-right bg-transparent outline-none text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                </div>
                <div className="flex flex-row w-full border rounded-lg px-2 py-1">
                    <span className="text-gray-400 text-sm mr-2">Size</span>
                    <input type="number" className="w-full text-right bg-transparent outline-none text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                    <select name="token" id="token" className="outline-none bg-transparent text-sm">
                        <option value="usdc" className="bg-[#222428] outline-none text-sm">USDC</option>
                        <option value="hype" className="bg-[#222428] outline-none text-sm">HYPE</option>
                    </select>
                </div>
                <div className="flex w-full gap-2">
                    <Slider
                        defaultValue={value}
                        max={100}
                        step={1}
                        className="flex-1 w-full"
                        onValueChange={setValue}
                    />
                    <div className="flex flex-row border rounded-lg w-16 justify-between px-2 py-1">
                        <input type="number" max={100} value={value[0]} className="w-6 outline-none bg-transparent text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
                        <span>%</span>
                    </div>
                </div>
            </div>
            <div>
                {side == 'buy' ? (
                    <button className="w-full text-center text-base font-semibold mt-2 py-2 bg-[#0064A7] hover:opacity-80 rounded-lg">
                        Buy
                    </button>
                ) : (
                    <button className="w-full text-center text-base font-semibold mt-2 py-2 bg-[#B8303E] hover:opacity-80 rounded-lg">
                        Sell
                    </button>
                )}
                <div className="flex flex-col gap-2 border-t-2 mt-2 py-2">
                    <div className="flex flex-row justify-between text-gray-300 text-xs">
                        <span className="font-normal">Order Value</span>
                        <span className="font-normal">N / A</span>
                    </div>
                    <div className="flex flex-row justify-between text-gray-300 text-xs">
                        <span className="font-normal">Fees</span>
                        <span className="font-normal">0.0350% / 0.0100%</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function BuyAndSell(type: string) {
    return (
        <div className="w-full bg-gray-900 rounded-b-lg text-white p-4">
            <Tabs defaultValue={"buy"} className="w-full">
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
                    {BuyAndSellComponent(type, 'buy')}
                </TabsContent>
                <TabsContent value="sell">
                    {BuyAndSellComponent(type, 'sell')}
                </TabsContent>
            </Tabs>
        </div>
    )
}