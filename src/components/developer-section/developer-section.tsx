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

            {/* API and Documentation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12">
                <div className="bg-[#111] text-white p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col border border-gray-200 dark:border-gray-900 hover:border hover:border-[#0064A7] dark:hover:border dark:hover:border-[#0064A7] transition-all duration-300">
                    <div className="relative w-full flex items-center justify-center">
                        <Code2 className="w-1/2 h-40 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="flex-grow space-y-3 sm:space-y-4">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold dark:text-white">Open-source architecture</h3>
                        <p className="text-white leading-relaxed text-sm sm:text-base">
                            Access and contribute to our transparent, open-source codebase. Built with modern technologies and best practices for maximum flexibility.
                        </p>
                    </div>
                    <a href="#" className="w-full mt-4 sm:mt-6 inline-block bg-gradient-to-r from-[#0064A7] to-[#00416C] text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-medium hover:opacity-80 transition-all duration-300 text-center">
                        Explore our code →
                    </a>
                </div>

                <div className="bg-[#111] text-white p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col border border-gray-200 dark:border-gray-900 hover:border hover:border-[#0064A7] dark:hover:border dark:hover:border-[#0064A7] transition-all duration-300">
                    <div className="relative w-full flex items-center justify-center">
                        <Terminal className="w-1/2 h-40 text-white" strokeWidth={1.5} />
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

                <div className="bg-[#111] text-white p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col h-full border border-gray-200 dark:border-gray-900 hover:border hover:border-[#0064A7] dark:hover:border dark:hover:border-[#0064A7] transition-all duration-300">
                    <div className="relative w-full flex items-center justify-center">
                        <BookOpen className="w-1/2 h-40 text-white" strokeWidth={1.5} />
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


                <div className="bg-[#111] text-white p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col h-full border border-gray-200 dark:border-gray-900 hover:border hover:border-[#0064A7] dark:hover:border dark:hover:border-[#0064A7] transition-all duration-300">
                    <div className="relative w-full flex items-center justify-center">
                        <Puzzle className="w-1/2 h-40 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="flex-grow space-y-3 sm:space-y-4">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold dark:text-white">Custom integration options</h3>
                        <p className="text-white leading-relaxed text-sm sm:text-base">
                            Get started quickly with our detailed documentation, complete with examples, tutorials, and best practices guides.
                        </p>
                    </div>
                    <a href="#" className="w-full mt-4 sm:mt-6 inline-block bg-gradient-to-r from-[#0064A7] to-[#00416C] text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-medium hover:opacity-80 transition-all duration-300 text-center">
                        Explore integration options →
                    </a>
                </div>
            </div>
        </section>
    );
};

export default DeveloperFeatures;