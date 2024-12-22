'use client';

import { ReactNode } from "react";
import TradingLayout from "@/components/trading/trading-layout";
import { ThemeProvider } from "next-themes";

const Trade = () => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark" // Set default theme ke "dark"
      disableTransitionOnChange
    >
    <div className="">
      <TradingLayout />
    </div>
    </ThemeProvider>
  );
};

// Tanpa Layout
Trade.getLayout = function getLayout(page: ReactNode) {
  return page; 
};

export default Trade;
