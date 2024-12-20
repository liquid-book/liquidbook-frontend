import Image from "next/image";
import { motion } from "motion/react";

function StartedCard() {
    interface Card {
        title: string,
        description: string,
        imageSrc: string,
        imageAlt: string,
        href: string,
        textButton: string
    }

    const cards : Card[] = [
        {
          title: "Documentation",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          imageSrc: "/images/documentation.webp",
          imageAlt: "Documentation Image",
          href: "/documentation",
          textButton: "Documentation →"
        },
        {
          title: "Blog",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          imageSrc: "/images/blog.webp",
          imageAlt: "Blog Image",
          href: "/blog",
          textButton: "Blog →"
        },
        {
          title: "Community",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          imageSrc: "/images/community.webp",
          imageAlt: "Community Image",
          href: "/community",
          textButton: "Community →"
        },
    ]

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">    
            <div className="text-start mb-8 sm:mb-12">
                <h2 className="font-bold text-3xl md:text-4xl text-black dark:text-white">
                    Getting Start
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {cards.map((card, index) => (
                <motion.div
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type:"spring", stiffness: 100 }}
                >
                    <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col h-full border border-gray-200 dark:border-gray-900 hover:border hover:border-indigo-500/100 dark:hover:border dark:hover:border-indigo-500/100 transition-all duration-300">
                        <div className="flex justify-center mb-4 sm:mb-6">
                            <div className="relative w-full h-[10rem] lg:h-[12rem] xl:h-[18rem] 2xl:h-[20rem]">
                                <Image
                                    src={card.imageSrc}
                                    alt={card.imageAlt}
                                    fill
                                    className="rounded-lg object-cover"
                                    priority
                                />
                            </div>
                        </div>
                        <div className="flex-grow space-y-3 sm:space-y-4">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold dark:text-white">{card.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                                {card.description}
                            </p>
                        </div>
                        <a href={card.href} className="w-full mt-4 sm:mt-6 inline-block bg-gradient-to-r from-blue-600 to-violet-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-medium text-center">
                            {card.textButton}
                        </a>
                    </div>
                </motion.div>
            ))}
            </div>
        </div>
    );
};

export default StartedCard;
