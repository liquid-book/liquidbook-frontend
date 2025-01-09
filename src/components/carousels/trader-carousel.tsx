import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { 
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
 } from "../ui/carousel";
 import Image from "next/image";

function TradeCarousel() {
    const plugin = React.useRef(
        Autoplay({delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true})
    )

    interface Carousel {
        image: string,
        title: string,
        text: string,
    }

    const carousels : Carousel[] = [
        {
            image: "/images/tradeCarousel1.jpg",
            title: "Real-time order matching",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
            image: "/images/tradeCarousel2.jpg",
            title: "Advanced trading tools",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
            image: "/images/tradeCarousel3.jpg",
            title: "Cross-chain compatibility",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
            image: "/images/tradeCarousel4.jpg",
            title: "Institutional-grade security",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        }
    ];    

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
            <div className="text-start mb-8 sm:mb-12">
                <h2 className="font-bold text-3xl md:text-4xl text-black dark:text-white">
                    For Traders
                </h2>
            </div>
            <Carousel
                plugins={[plugin.current]}
                opts={{
                    align: "center",
                    loop: true
                }}
                className="w-full min-h-fit h-fit rounded-2xl"
            >
                <CarouselContent>
                    {carousels.map(function (carousel, index) {
                        return (
                            <CarouselItem key={index}>
                                <div className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-900 text-black dark:text-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl mx-auto gap-8 sm:gap-12 md:gap-16 border border-gray-200 dark:border-gray-900 hover:border hover:border-indigo-500/100 dark:hover:border dark:hover:border-indigo-500/100 transition-all duration-300">
                                    <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                                        <div className="relative w-[22rem] h-[22rem] sm:w-[30rem] sm:h-[30rem]">
                                            <Image
                                                src={carousel.image}
                                                alt="Multi Use Case Illustration"
                                                fill
                                                className="rounded-2xl shadow-lg object-cover"
                                                priority
                                            />
                                        </div>
                                    </div>
                    
                                    <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                                            {carousel.title}
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                                            {carousel.text}
                                        </p>
                                        <div className="flex justify-center md:justify-start w-full">
                                            <a
                                                href="#"
                                                className="w-full md:w-auto inline-block bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 sm:py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg font-semibold hover:opacity-80 transition-all duration-300 text-center"
                                            >
                                                Decentralized Exchange →
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>  
                        )
                    })}
                </CarouselContent>
                <CarouselPrevious className="flex items-center max-lg:hidden" />
                <CarouselNext className="flex items-center max-lg:hidden" />
            </Carousel>
        </div>
    );
}

export default TradeCarousel;