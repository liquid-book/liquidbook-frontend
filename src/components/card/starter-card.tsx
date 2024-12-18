import Image from "next/image";
import { 
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function StartedCard() {
    const cards = [
        {
          title: "Documentation",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          imageSrc: "/documentation.jpeg",
          href: "/documentation",
        },
        {
          title: "Blog",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          imageSrc: "/blog.jpeg",
          href: "/blog",
        },
        {
          title: "Community",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          imageSrc: "/community.png",
          href: "/community",
        },
    ]

    return (
        <div className="container mx-auto px-4 py-8 max-w-[1280px] min-w-[768px] h-screen flex flex-col gap-8">
            <h2 className="font-bold text-4xl">Getting Start</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {cards.map((card, index) => (
                // <a href={card.href} key={index}>
                    <Card key={index} className="flex flex-col hover:border-violet-800">
                        <CardHeader className="h-[400px] w-full flex justify-items-center rounded-lg">
                            <Image src={card.imageSrc} alt="image" width={500} height={300}/>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <h1 className="font-bold text-2xl">{card.title}</h1>
                            <p className="text-neutral-400">{card.description}</p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="link" className="p-0 h-auto text-blue-500 text-xl font-medium hover:underline"><a href={card.href} className="flex flex-row items-baseline gap-2">{card.title} <ArrowRight/></a></Button>
                        </CardFooter>
                    </Card>
                // </a>
            ))}
            </div>
        </div>
    );
};

export default StartedCard;
