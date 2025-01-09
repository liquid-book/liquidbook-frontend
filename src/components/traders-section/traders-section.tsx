import { Zap, BarChart2, ShieldCheck } from 'lucide-react'
import Link from "next/link"

export default function TradersSection() {
    const features = [
        {
            name: "Real-time order matching",
            Icon: Zap,
            description: "Experience seamless trading with our real-time order matching system, ensuring fast and efficient transactions.",
            link: "#"
        },
        {
            name: "Advanced trading tools",
            Icon: BarChart2,
            description: "Enhance your trading strategies with our suite of advanced tools designed for professional and beginner traders alike.",
            link: "#"
        },
        {
            name: "Secure cross-chain trading",
            Icon: ShieldCheck,
            description: "Trade confidently across multiple blockchain networks with institutional-grade security protocols and advanced encryption standards.",
            link: "#"
        }
    ];

    return (
        <div className="w-full py-20 px-4">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#0064A7] to-[#00416C] bg-clip-text text-[#00416C] dark:text-white">
                    For Traders
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-6xl mx-auto">
                    Discover the tools and technologies that empower traders <br/>to make faster, smarter, and more efficient trades.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature) => (
                        <div
                            key={feature.name}
                            className="group relative bg-[#111]
                                     dark:from-[#0064A7]/80 dark:to-[#00416C]/80 
                                     p-8 rounded-lg flex flex-col items-center text-center
                                     border border-gray-100 dark:border-transparent
                                     hover:border-[#0064A7]/30 dark:hover:border-[#0064A7]/30
                                     hover:shadow-lg dark:hover:shadow-[#0064A7]/5
                                     transition-all duration-300 ease-in-out"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-[#0064A7] to-[#00416C] 
                                          rounded-full flex items-center justify-center mb-6
                                          transform group-hover:scale-110 transition-transform duration-300">
                                <feature.Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                            </div>

                            <h2 className="text-2xl font-bold mb-4 
                                         bg-gradient-to-r from-[#0064A7] to-[#00416C] bg-clip-text text-white">
                                {feature.name}
                            </h2>

                            <p className="text-white mb-8 flex-grow font-thin">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}