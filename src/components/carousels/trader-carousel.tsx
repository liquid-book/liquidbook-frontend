import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card } from "../ui/card";
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

    const carousels = [
        {
            image: "/tradeCarousel1.jpg",
            title: "Real-time order matching",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
            image: "/tradeCarousel2.jpg",
            title: "Advanced trading tools",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
            image: "/tradeCarousel3.jpg",
            title: "Cross-chain compatibility",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
            image: "/tradeCarousel4.jpg",
            title: "Institutional-grade security",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        }
    ];    

    return (
        <div className="flex justify-center w-full mt-[43px] h-screen">
            <div className="flex flex-col items-start justify-center w-full max-w-[1280px] min-w-[768px] gap-8">
                <h2 className="font-bold text-4xl">For Traders</h2>
                <Carousel
                    plugins={[plugin.current]}
                    opts={{
                        align: "center",
                        loop: true
                    }}
                    className="w-full min-h-fit h-fit"
                >
                    <CarouselContent>
                        {carousels.map(function (carousel, index) {
                            return (
                                <CarouselItem key={index}>
                                    <Card>
                                        <div className="w-full flex flex-row h-fit">
                                            <div className="w-fit">
                                                <Image src={carousel.image} alt="Carousel" width={1200} height={1200} className="rounded-xl"/>
                                            </div>
                                            <div className="w-full p-10 flex flex-col justify-between">
                                                <div className="flex flex-col gap-8">
                                                    <h4 className="font-bold text-4xl">{carousel.title}</h4>
                                                    <p className="text-neutral-400">{carousel.text}</p>
                                                </div>
                                                <button className="border border-black dark:border-white rounded-lg w-fit px-4 py-2 font-medium">Show more</button>
                                            </div>
                                        </div>
                                    </Card>
                                </CarouselItem>  
                            )
                        })}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    );
}

export default TradeCarousel;