import React from "react";
import Image from "next/image";
import { Link } from "lucide-react";

const KeyFeatures = () => {
    return (
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
            <div className="text-start mb-8 sm:mb-12">
                <h2 className="font-bold text-3xl md:text-4xl text-black dark:text-white">
                    Key Features
                </h2>
            </div>

            {/* First Section */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-900 text-black dark:text-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl mx-auto gap-8 sm:gap-12 md:gap-16 border border-gray-200 dark:border-gray-900 hover:border hover:border-indigo-500/100 dark:hover:border dark:hover:border-indigo-500/100 transition-all duration-300">
                <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                    <div className="relative w-[22rem] h-[22rem] sm:w-[30rem] sm:h-[30rem]">
                        <Image
                            src="/images/single-liquidity.jpg"
                            alt="Multi Use Case Illustration"
                            fill
                            className="rounded-2xl shadow-lg object-cover"
                            priority
                        />
                    </div>
                </div>

                <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                        Single Liquidity
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                        Access unified liquidity for <span className="font-semibold">better efficiency</span> and seamless trading across multiple markets. By aggregating liquidity into a single pool,
                        <span className="font-semibold"> Liquid Book </span> ensures reduced slippage, faster execution, and optimal pricing, enabling you to maximize opportunities effortlessly.
                    </p>
                    <div className="flex justify-center md:justify-start w-full">
                        <a
                            href="#"
                            className="w-full md:w-auto inline-block bg-gradient-to-r from-[#2B3990] via-[#1B1B1B] to-[#533593] text-white py-2 sm:py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg font-semibold hover:opacity-80 transition-all duration-300 text-center"
                        >
                            How Liquid Book Works →
                        </a>
                    </div>
                </div>
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12">
                {/* Card 1 */}
                <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col h-full border border-gray-200 dark:border-gray-900 hover:border hover:border-indigo-500/100 dark:hover:border dark:hover:border-indigo-500/100 transition-all duration-300">
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <div className="relative w-full h-[14rem] sm:h-[16rem] md:h-[20rem]">
                            <Image
                                src="/images/multi-use-case.jpeg"
                                alt="Multi Use Case"
                                fill
                                className="rounded-lg object-cover"
                                priority
                            />
                        </div>
                    </div>
                    <div className="flex-grow space-y-3 sm:space-y-4">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold dark:text-white">Multi Use Case</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                            The <span className="font-semibold">Liquid Book App</span> offers advanced tools and real-time tracking for seamless strategy execution, empowering traders to manage portfolios, optimize trades, and monitor trends effortlessly.
                        </p>
                    </div>
                    <a
                        href="#"
                        className="w-full mt-4 sm:mt-6 inline-block bg-gradient-to-r from-[#2B3990] via-[#1B1B1B] to-[#533593] text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-medium hover:opacity-80 transition-all duration-300 text-center"
                    >
                        How Liquid Book Works →
                    </a>
                </div>

                {/* Card 2 */}
                <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col h-full border border-gray-200 dark:border-gray-900 hover:border hover:border-indigo-500/100 dark:hover:border dark:hover:border-indigo-500/100 transition-all duration-300">
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <div className="relative w-full h-[14rem] sm:h-[16rem] md:h-[20rem]">
                            <Image
                                src="/images/multi-chain.jpeg"
                                alt="Multi-chain"
                                fill
                                className="rounded-lg object-cover"
                                priority
                            />
                        </div>
                    </div>
                    <div className="flex-grow space-y-3 sm:space-y-4">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold dark:text-white">Multi-chain</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                            Seamlessly trade across multiple blockchain networks with <span className="font-semibold">unified liquidity</span> and <span className="font-semibold">cross-chain compatibility</span>. Liquid Book enables secure, fast, and cost-efficient trading between blockchains, empowering users to access a broader range of assets without friction.
                        </p>
                    </div>
                    <a
                        href="#"
                        className="w-full mt-4 sm:mt-6 inline-block bg-gradient-to-r from-[#2B3990] via-[#1B1B1B] to-[#533593] text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-medium hover:opacity-80 transition-all duration-300 text-center"
                    >
                        Get Started →
                    </a>
                </div>
            </div>

            {/* Last Section */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-between bg-white dark:bg-gray-900 text-black dark:text-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl mx-auto gap-8 sm:gap-12 md:gap-16 mt-8 sm:mt-12 border border-gray-200 dark:border-gray-900 hover:border hover:border-indigo-500/100 dark:hover:border dark:hover:border-indigo-500/100 transition-all duration-300">
                <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                        Integration
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                        Integration with <span className="font-semibold">Arbitrum Orbit</span> unlocks unparalleled scalability and speed, enabling seamless transactions and efficient processing for high-throughput demands. By leveraging advanced Layer 2 technology, Liquid Book ensures lower costs, faster execution, and optimized performance.
                    </p>
                    <div className="flex justify-center md:justify-start w-full">
                        <a
                            href="#"
                            className="w-full md:w-auto inline-block bg-gradient-to-r from-[#2B3990] via-[#1B1B1B] to-[#533593] text-white py-2 sm:py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg font-semibold hover:opacity-80 transition-all duration-300 text-center"
                        >
                            How Liquid Book Works →
                        </a>
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <div className="relative w-[22rem] h-[22rem] sm:w-[30rem] sm:h-[30rem]">
                        <Image
                            src="/images/arbitrum.jpg"
                            alt="Multi Use Case Illustration"
                            fill
                            className="rounded-2xl shadow-lg object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KeyFeatures;
