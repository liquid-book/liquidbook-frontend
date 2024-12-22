import ChartOrder from '@/components/order-book/chart-order'
import OrderBookComponent from '@/components/order-book/order-book'
import React from 'react'

function Dex() {
    return (
        <div className="w-full max-w-screen-2xl mx-auto min-h-[calc(100vh)] bg-cover bg-center text-gray-900 dark:text-white flex items-center justify-center px-4 py-6 sm:p-8 lg:p-6">
            <div className="w-full mx-auto flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-2">
                <ChartOrder />
                <OrderBookComponent />
            </div>
        </div>
    )
}

export default Dex