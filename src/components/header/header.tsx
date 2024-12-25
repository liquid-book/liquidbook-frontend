import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "../button/button";
import { Sheet, SheetContent, SheetTrigger } from "../sheet/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const links = [
    { destination: "/", label: "Home" },
    { destination: "/trade", label: "Trade" },
  ];

  return (
    <header className="backdrop-blur-sm lg:px-[10vw] mx-auto w-full fixed z-50">
      <nav className="flex flex-row justify-between items-center py-3 px-2">
        <div className="w-56">
          <Link href="/" className="flex flex-row gap-2">
            <img
              src={theme === "dark" ? "/logo.png" : "/logo-blue.svg"}
              className="h-8"
              alt="Liquid Book Logo"
            />
            <p className="text-2xl lg:text-3xl font-bold text-[#0064A7] dark:text-white">
              Liquid Book
            </p>
          </Link>
        </div>

        <div className="hidden md:flex items-center justify-center flex-1 gap-4">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.destination}
              className={cn(
                "text-sm lg:text-lg px-4 py-1 rounded-lg transition-all",
                "hover:bg-[#0064A7]/10 hover:text-[#0064A7]",
                "dark:hover:bg-white/10 dark:hover:text-white",
                pathname === link.destination ? (
                  "bg-[#0064A7] text-white dark:bg-white dark:text-[#0064A7]"
                ) : (
                  "text-[#0064A7] dark:text-gray-200"
                )
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="w-56 flex justify-end">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden sm:flex text-[#0064A7] dark:text-gray-200"
          >
            {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </Button>
        </div>

        <div className="flex gap-2 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="text-[#0064A7] dark:text-gray-200">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-8 pt-4">
                  <h2 className="text-2xl font-bold">Liquid Book</h2>
                </div>
                <div className="flex flex-col gap-4">
                  {links.map((link) => (
                    <Link key={link.label} href={link.destination}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start font-medium"
                      >
                        {link.label}
                      </Button>
                    </Link>
                  ))}
                </div>
                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-[#0064A7]">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                      {theme === "dark" ? <Sun /> : <Moon />}
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Header;