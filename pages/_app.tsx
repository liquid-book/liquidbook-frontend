import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { wagmiConfig } from "@/configs/wagmi";
import { Chain, darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";
import "../styles/globals.css";
import GradientBackground from "@/components/gradient-backgrounf/gradient-background";

const localChain: Chain = {
  id: 1337,
  name: "Liquid Book",
  nativeCurrency: {
    decimals: 18,
    name: "Liquid Book",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://example"],
    },
    public: {
      http: ["https://example"],
    },
  },
  blockExplorers: {
    default: {
      name: "Liquid Book",
      url: "https://example",
    },
  },
  testnet: true,
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          initialChain={arbitrumSepolia}
          theme={darkTheme({
            accentColor: "white",
            accentColorForeground: "black",
          })}
        >
          <ThemeProvider
            disableTransitionOnChange
            attribute="class"
            value={{ light: "light", dark: "dark" }}
            defaultTheme="system"
          >
            <Header />
            <div className="lg:px-[10vw]">
              <Component {...pageProps} />
            </div>
            <Footer />
          </ThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
