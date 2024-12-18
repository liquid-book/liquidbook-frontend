'use client';

import { Button } from "@/components/button/button";
import StartedCard from "@/components/card/starter-card";
import DevCarousel from "@/components/carousels/dev-carousel";
import TradeCarousel from "@/components/carousels/trader-carousel";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import RetroGrid from "@/components/ui/retro-grid";
import ShimmerButton from "@/components/ui/shimmer-button";
import ClientWrapper from "@/components/wrapper/client-wrapper";
import { cn } from "@/lib/utils";
import type { NextPage } from "next";
import Image from "next/image";
import * as z from "zod";

const faucetSchema = z.object({
  token: z.string().min(1),
});

const Home: NextPage = () => {


  return (
    <main>
      <div>
        {/* Hero Section */}
        <div className="w-full max-w-screen-2xl mx-auto min-h-[calc(100vh-80px)] bg-cover bg-center text-gray-900 dark:text-white flex items-center justify-center px-4 py-6 sm:p-8 lg:p-6">
          <div className="w-full mx-auto flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-12">
            <LeftSection />
            <RightSection />
          </div>
          <RetroGrid />
        </div>
        <TradeCarousel/>
        <DevCarousel/>
        <StartedCard/>
      </div>
    </main>
  );
};

export default Home;

const LeftSection = () => {
  return (
    <div className="w-full lg:w-2/3 text-center lg:text-left">
      <div className="z-10 flex items-center justify-center lg:justify-start">
        <AnimatedGradientText>
          <span
            className={cn(
              // `h-22 text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold inline animate-gradient bg-gradient-to-r from-[#8FA4DD] via-[#1e3a8a] to-[#8FA4DD] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
              `h-22 text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold inline animate-gradient bg-gradient-to-r from-[#CBD6F5] via-[#8FA4DD] to-[#CBD6F5] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
            )}
          >
            Gateway to Decentralized Trading Like Never Before
          </span>
        </AnimatedGradientText>
      </div>
      <p className="text-base sm:text-lg md:text-2xl text-gray-700 dark:text-white leading-relaxed my-5">
        Secure, Transparent, and Lightning-Fast
        <br />
        Harness the Power of Decentralization for Seamless Trade Execution

      </p>
      <Button variant={"default"} size={"xl"} className="mt-4">
          Explore More
      </Button>
    </div>
  );
};

const RightSection = () => {
  return (
    <>
      <div className="hidden lg:flex w-full lg:w-1/3 justify-center lg:justify-end items-center">
        <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 lg:w-[35rem] md:h-[30rem] relative flex justify-center items-center animate-float">
        <Image
            src="/gif-hero.gif"
            alt="Protect.Fi Logo"
            width={500}
            height={500}
            className="object-contain block rounded-2xl"
          />
        </div>
      </div>
    </>
  );
};
