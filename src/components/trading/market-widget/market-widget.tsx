'use client'

import React, { useEffect, useState } from 'react'
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface MarketData {
  price: number | null
  volume24h: number | null
  marketCap: number | null
  priceChange24h: number | null
  priceChangePercent24h: number | null
}

const SkeletonLoader = () => (
  <div className="w-full h-16 bg-[#1B2028] rounded-lg animate-pulse flex items-center px-4 space-x-8">
    {[...Array(7)].map((_, i) => (
      <div key={i} className="h-8 bg-gray-700/50 rounded w-32" />
    ))}
  </div>
)

export default function MarketDataWidget() {
  const [marketData, setMarketData] = useState<MarketData>({
    price: null,
    volume24h: null,
    marketCap: null,
    priceChange24h: null,
    priceChangePercent24h: null,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const pollMarketData = async () => {
      try {
        const tickerData = await fetch('https://www.okx.com/api/v5/market/ticker?instId=ETH-USDC').then(r => r.json())

        if (tickerData.data?.[0]) {
          const ticker = tickerData.data[0]
          const priceChange = parseFloat(ticker.last) - parseFloat(ticker.open24h)
          const priceChangePercent = (priceChange / parseFloat(ticker.open24h)) * 100

          setMarketData({
            price: parseFloat(ticker.last),
            volume24h: parseFloat(ticker.volCcy24h),
            marketCap: 8515433868, // Hardcoded for demo
            priceChange24h: priceChange,
            priceChangePercent24h: priceChangePercent,
          })
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching market data:', error)
        setIsLoading(false)
      }
    }

    pollMarketData()
    const intervalId = setInterval(pollMarketData, 1000)
    return () => clearInterval(intervalId)
  }, [])

  const formatNumber = (value: number | null, options: {
    decimals?: number
    prefix?: string
    suffix?: string
    compact?: boolean
  } = {}) => {
    if (value === null) return '...'
    const { decimals = 2, prefix = '', suffix = '', compact = false } = options

    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      notation: compact ? 'compact' : 'standard',
    })

    return `${prefix}${formatter.format(value)}${suffix}`
  }

  if (isLoading) return <SkeletonLoader />

  return (
    <div className="w-full bg-gray-900 text-white flex items-center h-16 px-4 rounded-lg">
      <div className="flex items-center space-x-2 w-56">
        <img src="/icon/eth-usdc.svg" alt="ETH" className="w-14 h-14" />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-medium text-lg">ETH-USD</span>
            <span className="text-emerald-500 text-xs p-1 bg-emerald-500/10 rounded">Spot</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-4 justify-center">
        <div className="text-gray-400 text-xs w-16">
          <div className='font-semibold underline'>Price</div>
          <div className='text-white'>{formatNumber(marketData.price, { prefix: '$' })}</div>
        </div>

        <div className="text-gray-400 text-xs w-28">
          <div className='font-semibold'>24h Change</div>
          <div className={cn(
            marketData.priceChangePercent24h && marketData.priceChangePercent24h >= 0 ? 'text-[#5BBB6F]' : 'text-[#FF6978]'
          )}>
            {marketData.priceChange24h && marketData.priceChangePercent24h && (
              <>
                {formatNumber(marketData.priceChange24h, { prefix: marketData.priceChange24h >= 0 ? '+' : '' })} /{' '}
                {formatNumber(marketData.priceChangePercent24h, { prefix: marketData.priceChangePercent24h >= 0 ? '+' : '', suffix: '%' })}
              </>
            )}
          </div>
        </div>

        <div className="text-gray-400 text-xs w-24">
          <div className='font-semibold'>24h Volume</div>
          <div className='text-white'>{formatNumber(marketData.volume24h, { prefix: '$', compact: true })}</div>
        </div>

        <div className="text-gray-400 text-xs w-24">
          <div className='font-semibold'>Market Cap</div>
          <div className='text-white'>{formatNumber(marketData.marketCap, { prefix: '$', compact: true })}</div>
        </div>

        <div className="text-gray-400 text-xs w-32">
          <div className='font-semibold'>Contract</div>
          <div className="flex items-center text-white">
            0x0d01...11ec
            <ArrowUpIcon className="w-3 h-3 ml-1 rotate-45" />
          </div>
        </div>
      </div>
    </div>
  )
}