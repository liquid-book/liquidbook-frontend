import { cn } from "@/lib/utils"
import AnimatedGridPattern from "../ui/animated-grid-pattern"
import { Repeat2, LineChart, Wallet } from 'lucide-react'

export default function FeaturesGrid() {
  const features = [
    {
      title: "Rehypothecation",
      description: "Earn yield on idle funds while your limit orders await execution",
      Icon: Repeat2
    },
    {
      title: "Multi-Pairs Limit Order",
      description: "Maximum chance to catch the bottom at full power",
      Icon: LineChart
    },
    {
      title: "Use of Funds",
      description: "Optimize your capital efficiency by putting your assets to work across multiple trading strategies simultaneously",
      Icon: Wallet
    },
  ]

  return (
    <div className="relative w-full py-20 px-4 bg-white dark:bg-black transition-colors duration-200 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto relative z-10">
        <h2 className="text-6xl font-bold text-center mb-4 bg-gradient-to-r from-[#0064A7] to-[#00416C] bg-clip-text text-[#00416C] dark:text-white">
          Key Features
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-6xl mx-auto text-center">
          Experience advanced trading features designed to maximize your trading potential and capital efficiency.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-[#0064A7] to-[#00416C] 
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

              <h3 className="text-2xl font-bold mb-4 underline text-white">
                {feature.title}
              </h3>

              <p className="text-white flex-grow">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(1400px_circle_at_center,white,transparent)]",
          "absolute inset-x-0 inset-y-0 z-0"
        )}
      />
    </div>
  )
}