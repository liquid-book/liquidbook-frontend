import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

const onInput = (value: number) => {

}

const TabComponent = (type: string) => {
    return (
        <div>
            <div className="w-full flex flex-col gap-2 mt-2 h-64 overflow-auto">
                <span className="text-gray-400 text-xs">Buying Power <span className="text-white">$ 0</span></span>
                <div className={`w-full ${type == 'stop' || type == 'stop-limit' ? 'flex flex-row' : 'hidden'} justify-between items-center text-sm`}>
                    <span>Stop Price</span>
                    <input type="number" onInput={() => onInput(0)} name="stop-price" id="stop-price" placeholder="Input Price" className="w-36 h-9 rounded-md text-center border-2 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                </div>
                <div className={`w-full ${type == 'limit' || type == 'stop-limit' ? 'flex flex-row' : 'hidden'} justify-between items-center text-sm`}>
                    <span>Limit Price</span>
                    <input type="number" name="limit-price" id="limit-price" placeholder="Input Price" className="w-36 h-9 rounded-md text-center border-2 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                </div>
                <div className={`w-full flex flex-row justify-between items-top text-sm`}>
                    <span className="mt-2">Amount</span>
                    <div className="w-36 flex flex-col">
                        <input type="number" name="jumlah" placeholder="Input Amount" className="w-full h-9 rounded-md text-center border-2 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        <span className="w-36 text-center text-gray-400">=~</span>
                    </div>
                </div>
                <div className={`w-full ${type == 'market' ? 'hidden' : 'flex flex-row'} justify-between items-center text-sm`}>
                    <div className="flex flex-row gap-2">
                        <input type="radio" />
                        <span>Take Profit</span>
                    </div>
                    <div className="flex flex-row w-36 gap-1">
                        <input type="number" name="percentage-take-profit" className="w-10 h-9 rounded-md text-center border-2 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="0%" />
                        <input type="number" name="take-profit" className="w-full h-9 rounded-md text-center border-2 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="Input Price" />
                    </div>
                </div>
                <div className={`w-full ${type == 'market' ? 'hidden' : 'flex flex-row'} justify-between items-center text-sm`}>
                    <div className="flex flex-row gap-2">
                        <input type="radio" />
                        <span>Stop Loss</span>
                    </div>
                    <div className="flex flex-row w-36 gap-1">
                        <input type="number" name="percentage-take-profit" className="w-10 h-9 rounded-md text-center border-2 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="0%" />
                        <input type="number" name="take-profit" className="w-full h-9 rounded-md text-center border-2 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="Input Price" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 border-t-2 mt-2 py-2">
                <div className="flex felx-row justify-between text-white text-sm">
                    <span className="font-semibold">Total Estimate</span>
                    <span className="font-semibold">$ 0</span>
                </div>
                <div className="flex flex-row justify-between text-gray-300 text-xs">
                    <span className="font-normal">Transaction Fees</span>
                    <span className="font-normal">$ 0</span>
                </div>
                <div className="flex flex-row justify-between text-gray-300 text-xs">
                    <span className="font-normal">Third Party Taxes And Fees</span>
                    <span className="font-normal">$ 0</span>
                </div>
            </div>
            <div className="flex felx-row border-t-2 mt-2 py-2 justify-between text-white text-sm">
                <span className="font-semibold">Estimated Costs</span>
                <span className="font-semibold">$ 0</span>
            </div>
            <button className="w-full text-center text-lg font-semibold mt-2 py-2 bg-green-500 hover:opacity-80 rounded-xl">
                Buy
            </button>
        </div>
    );
}

const BuyComponent = () => {
    return (
        <div className="w-full max-w-xs mx-auto bg-gray-900 rounded-xl border border-gray-800 text-white p-4 h-full">
            <Tabs defaultValue="market">
                <TabsList>
                    <TabsTrigger 
                        value="market"
                        className="data-[state=active]:border-b-green-500 data-[state=active]:border-b-2 data-[state=active]:text-white text-xs font-bold p-1 text-gray-400 hover:text-gray-200 px-2 mr-1"
                    >
                        Market
                    </TabsTrigger>
                    <TabsTrigger 
                        value="limit"
                        className="data-[state=active]:border-b-green-500 data-[state=active]:border-b-2 data-[state=active]:text-white text-xs font-bold p-1 text-gray-400 hover:text-gray-200 px-2 mr-1"    
                    >
                        Limit
                    </TabsTrigger>
                    <TabsTrigger 
                        value="stop"
                        className="data-[state=active]:border-b-green-500 data-[state=active]:border-b-2 data-[state=active]:text-white text-xs font-bold p-1 text-gray-400 hover:text-gray-200 px-2 mr-1"
                    >
                        Stop
                    </TabsTrigger>
                    <TabsTrigger 
                        value="stop-limit"
                        className="data-[state=active]:border-b-green-500 data-[state=active]:border-b-2 data-[state=active]:text-white text-xs font-bold p-1 text-gray-400 hover:text-gray-200 px-2 mr-1"
                    >
                        Stop-Limit
                    </TabsTrigger>
                    <TabsContent value="market">
                        {TabComponent('market')}
                    </TabsContent>
                    <TabsContent value="limit">
                        {TabComponent('limit')}
                    </TabsContent>
                    <TabsContent value="stop">
                        {TabComponent('stop')}
                    </TabsContent>
                    <TabsContent value="stop-limit">
                        {TabComponent('stop-limit')}
                    </TabsContent>
                </TabsList>
            </Tabs>
        </div>
    )
}

export default BuyComponent;