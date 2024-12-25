'use client';

import { Button } from "@/components/button/button";
import StartedCard from "@/components/card/starter-card";
import DevCarousel from "@/components/carousels/dev-carousel";
import TradeCarousel from "@/components/carousels/trader-carousel";
import DeveloperFeatures from "@/components/developer-section/developer-section";
import FeaturesGrid from "@/components/feature-grid/feature-grid";
import KeyFeatures from "@/components/key-features/key-features";
import TradersSection from "@/components/traders-section/traders-section";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import DotPattern from "@/components/ui/dot-pattern";
import GridPattern from "@/components/ui/grid-pattern";
import RetroGrid from "@/components/ui/retro-grid";
import ShimmerButton from "@/components/ui/shimmer-button";
import ClientWrapper from "@/components/wrapper/client-wrapper";
import { cn } from "@/lib/utils";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import * as z from "zod";

const Home: NextPage = () => {


  return (
    <main>
      <div className="w-full max-w-screen-2xl mx-auto min-h-[calc(92vh)] bg-cover bg-center text-gray-900 dark:text-white flex items-center justify-center">
        <div className="w-full mx-auto flex flex-col items-center justify-center">
          <div className="w-full text-center max-w-6xl z-10">
            <div className="z-10 flex items-center justify-center">
              <AnimatedGradientText className="">
                <span className={cn(
                  "h-22 text-3xl md:text-4xl lg:text-8xl lg:leading-[90px] font-bold inline animate-gradient bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent",
                  "bg-gradient-to-r from-[#0064A7] via-[#00416C] to-[#0064A7] dark:from-[#0076C4] dark:via-[#00416C] dark:to-[#0076C4]"
                )}>
                  Most Capital Efficient Order Book DEX
                </span>
              </AnimatedGradientText>
            </div>

            <p className="text-base sm:text-lg md:text-2xl text-gray-900 dark:text-white leading-relaxed my-4 mx-auto max-w-3xl py-2">
              Secure, Transparent, and Lightning-Fast
              <br />
              Harness the Power of Decentralization for Seamless Trade Execution
            </p>

            <Link href="/trade">
              <Button variant="blue" size="xl" className="mt-4">
                Trade Now
              </Button>
            </Link>
          </div>
        </div>
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
          )}
        />
      </div>
      <div className="w-full mx-auto min-h-[calc(100vh)] bg-cover bg-center text-gray-900 dark:text-white flex items-center justify-center sm:py-8 lg:py-6">
        <FeaturesGrid />
      </div>
      <div>
        <TradersSection />
      </div>
      <div>
        <DeveloperFeatures />
      </div>
    </main>
  );
};

export default Home;