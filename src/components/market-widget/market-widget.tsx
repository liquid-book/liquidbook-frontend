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
  markPrice: number | null
  spotPrice: number | null
  volume24h: number | null
  openInterest: number | null
  priceChange24h: number | null
  priceChangePercent24h: number | null
  fundingRate: number | null
  nextFundingTime: number | null
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
    markPrice: null,
    spotPrice: null,
    volume24h: null,
    openInterest: null,
    priceChange24h: null,
    priceChangePercent24h: null,
    fundingRate: null,
    nextFundingTime: null,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const pollMarketData = async () => {
      try {
        const [tickerData, markPriceData] = await Promise.all([
          fetch('https://www.okx.com/api/v5/market/ticker?instId=ETH-USDC').then(r => r.json()),
          fetch('https://www.okx.com/api/v5/public/mark-price?instId=ETH-USDC').then(r => r.json())
        ])

        if (tickerData.data?.[0] && markPriceData.data?.[0]) {
          const ticker = tickerData.data[0]
          const priceChange = parseFloat(ticker.last) - parseFloat(ticker.open24h)
          const priceChangePercent = (priceChange / parseFloat(ticker.open24h)) * 100

          setMarketData({
            markPrice: parseFloat(markPriceData.data[0].markPx),
            spotPrice: parseFloat(ticker.last),
            volume24h: parseFloat(ticker.volCcy24h),
            openInterest: 620022646.89, // Hardcoded for demo
            priceChange24h: priceChange,
            priceChangePercent24h: priceChangePercent,
            fundingRate: 0.0013, // Hardcoded for demo
            nextFundingTime: Date.now() + 3356000, // ~55 minutes from now
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

  const formatCountdown = (timestamp: number | null) => {
    if (!timestamp) return '--:--:--'
    const diff = Math.max(0, timestamp - Date.now())
    const hours = Math.floor(diff / 3600000)
    const minutes = Math.floor((diff % 3600000) / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  if (isLoading) return <SkeletonLoader />

  return (
    <div className="w-full bg-gray-900 text-white flex items-center h-16 px-4 rounded-lg">
      <div className="flex items-center space-x-2 w-48">
        <img src="/icon/eth-usdc.svg" alt="ETH" className="w-14 h-14" />
        <span className="font-medium">ETH-USD</span>
      </div>
      
      <div className="flex-1 flex gap-4">
        <div className="text-gray-400 text-xs w-16">
          <div className='underline'>Mark</div>
          <div>{formatNumber(marketData.markPrice, { prefix: '$' })}</div>
        </div>

        <div className="text-gray-400 text-xs w-16">
          <div className='underline'>Oracle</div>
          <div>{formatNumber(marketData.spotPrice, { prefix: '$' })}</div>
        </div>

        <div className="text-gray-400 text-xs w-28">
          <div className=''>24h Change</div>
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

        <div className="text-gray-400 text-xs w-18">
          <div>24h Volume</div>
          <div>{formatNumber(marketData.volume24h, { prefix: '$', compact: true })}</div>
        </div>

        <div className="text-gray-400 text-xs w-20">
          <div className='underline'>Open Interest</div>
          <div>{formatNumber(marketData.openInterest, { prefix: '$', compact: true })}</div>
        </div>

        <div className="text-gray-400 text-xs w-36">
          <div className='underline'>Funding / Countdown</div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className={cn(
                  marketData.fundingRate && marketData.fundingRate >= 0 ? 'text-[#5BBB6F]' : 'text-[#FF6978]'
                )}>
                  {formatNumber(marketData.fundingRate, { decimals: 4, suffix: '%' })}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Annualized: {formatNumber((marketData.fundingRate || 0) * 365 * 3, { decimals: 2, suffix: '%' })}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span>{"  "} {formatCountdown(marketData.nextFundingTime)}</span>
        </div>

        
      </div>
    </div>
  )
}

