import React from "react";
import Image from "next/image";
import { Code2, Terminal, Puzzle, BookOpen } from 'lucide-react';

const DeveloperFeatures = () => {
    return (
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
            <div className="text-start mb-8 sm:mb-12">
                <h2 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#0064A7] to-[#00416C] bg-clip-text text-[#00416C] dark:text-white text-center" >
                    For Developers
                </h2>
            </div>

            {/* Open Source Architecture Section */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-[#0064A7] to-[#00416C] 
                                     dark:from-[#0064A7]/80 dark:to-[#00416C]/80 text-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl mx-auto gap-8 sm:gap-12 md:gap-16 border border-gray-200 dark:border-gray-900 hover:border hover:border-[#0064A7] dark:hover:border dark:hover:border-[#0064A7] transition-all duration-300">
                <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                    <div className="relative w-[18rem] h-[18rem] sm:w-[30rem] sm:h-[30rem]">
                        <Code2 className="w-full h-full text-white" strokeWidth={1.5} />
                    </div>
                </div>

                <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                        Open-source architecture
                    </h3>
                    <p className="text-white leading-relaxed text-base sm:text-lg">
                        Access and contribute to our transparent, open-source codebase. Built with modern technologies and best practices for maximum flexibility.
                    </p>
                    <div className="flex justify-center md:justify-start w-full">
                        <a href="#" className="w-full md:w-auto inline-block bg-gradient-to-r from-[#0064A7] to-[#00416C] text-white py-2 sm:py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg font-semibold hover:opacity-80 transition-all duration-300 text-center">
                            Explore Our Code →
                        </a>
                    </div>
                </div>
            </div>

            {/* API and Documentation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12">
                <div className="bg-gradient-to-br from-[#0064A7] to-[#00416C] 
                                     dark:from-[#0064A7]/80 dark:to-[#00416C]/80 text-white p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col h-full border border-gray-200 dark:border-gray-900 hover:border hover:border-[#0064A7] dark:hover:border dark:hover:border-[#0064A7] transition-all duration-300">
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <div className="relative w-full h-[14rem] sm:h-[16rem] md:h-[20rem] flex items-center justify-center">
                            <Terminal className="w-1/2 h-1/2 text-white" strokeWidth={1.5} />
                        </div>
                    </div>
                    <div className="flex-grow space-y-3 sm:space-y-4">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold dark:text-white">Comprehensive API</h3>
                        <p className="text-white leading-relaxed text-sm sm:text-base">
                            Leverage our powerful and well-documented APIs to build, scale, and customize your trading applications with ease.
                        </p>
                    </div>
                    <a href="#" className="w-full mt-4 sm:mt-6 inline-block bg-gradient-to-r from-[#0064A7] to-[#00416C] text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-medium hover:opacity-80 transition-all duration-300 text-center">
                        View API Documentation →
                    </a>
                </div>

                <div className="bg-gradient-to-br from-[#0064A7] to-[#00416C] 
                                     dark:from-[#0064A7]/80 dark:to-[#00416C]/80 text-white p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col h-full border border-gray-200 dark:border-gray-900 hover:border hover:border-[#0064A7] dark:hover:border dark:hover:border-[#0064A7] transition-all duration-300">
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <div className="relative w-full h-[14rem] sm:h-[16rem] md:h-[20rem] flex items-center justify-center">
                            <BookOpen className="w-1/2 h-1/2 text-white" strokeWidth={1.5} />
                        </div>
                    </div>
                    <div className="flex-grow space-y-3 sm:space-y-4">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold dark:text-white">Developer-friendly documentation</h3>
                        <p className="text-white leading-relaxed text-sm sm:text-base">
                            Get started quickly with our detailed documentation, complete with examples, tutorials, and best practices guides.
                        </p>
                    </div>
                    <a href="#" className="w-full mt-4 sm:mt-6 inline-block bg-gradient-to-r from-[#0064A7] to-[#00416C] text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-medium hover:opacity-80 transition-all duration-300 text-center">
                        Read Documentation →
                    </a>
                </div>
            </div>

            {/* Custom Integration Section */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-between bg-gradient-to-br from-[#0064A7] to-[#00416C] 
                                     dark:from-[#0064A7]/80 dark:to-[#00416C]/80 text-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl mx-auto gap-8 sm:gap-12 md:gap-16 mt-8 sm:mt-12 border border-gray-200 dark:border-gray-900 hover:border hover:border-[#0064A7] dark:hover:border dark:hover:border-[#0064A7] transition-all duration-300">
                <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                        Custom integration options
                    </h3>
                    <p className="text-white leading-relaxed text-base sm:text-lg">
                        Seamlessly integrate our platform with your existing systems using our flexible SDKs and extensive integration options.
                    </p>
                    <div className="flex justify-center md:justify-start w-full">
                        <a href="#" className="w-full md:w-auto inline-block bg-gradient-to-r from-[#0064A7] to-[#00416C] text-white py-2 sm:py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg font-semibold hover:opacity-80 transition-all duration-300 text-center">
                            Explore Integration Options →
                        </a>
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <div className="relative w-[18rem] h-[18rem] sm:w-[30rem] sm:h-[30rem] flex items-center justify-center">
                        <Puzzle className="w-full h-full text-white" strokeWidth={1.5} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DeveloperFeatures;