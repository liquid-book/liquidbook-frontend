import useCurrentTheme from "@/hooks/styles/theme";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "../button/button";
import { Sheet, SheetContent, SheetTrigger } from "../sheet/sheet";

const Header = () => {
  const { setTheme } = useTheme();
  const currentTheme = useCurrentTheme();
  const links = [
    {
      destination: "/",
      label: "Home",
    },
    {
      destination: "/trade",
      label: "Trade",
    },
    // {
    //   destination: "/dex",
    //   label: "Dex",
    // },
    // {
    //   destination: "/docs",
    //   label: "Documentation",
    // },
  ];

  const changeTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="backdrop-blur-sm lg:px-[10vw] mx-auto w-full fixed z-50">
      <nav className="flex flex-row justify-between items-center py-2 px-2">
        <div className="flex flex-row gap-2 grow">
          <Link href="/" className="flex flex-row gap-2 w-56">
            <img
              src={currentTheme === "dark" ? "/logo.png" : "/logo-w.png"}
              className="h-8"
              alt="Liquid Book Logo"
            />
            <p className="text-2xl lg:text-3xl font-bold mr-6">Liquid Book</p>
          </Link>
          <div className="hidden lg:flex gap-4 items-center mx-auto">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.destination}
                passHref
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white
                  hover:bg-gradient-to-r from-[#2B3990] to-[#533593] hover:text-white`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex gap-2 w-56 justify-end">
          <Button variant="ghost" onClick={changeTheme}>
            {currentTheme === "light" ? <Sun /> : <Moon />}
          </Button>
        </div>
        <div className="flex gap-2 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="block lg:hidden">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-8 pt-4">
                  <h2 className="text-2xl font-bold">Liquid Book</h2>
                </div>
                <div className="flex flex-col gap-4">
                  {links.map((link) =>
                    link.label === "Pools" ? (
                      <div key={link.label} className="space-y-2">
                        <Button
                          variant="ghost"
                          className="w-full justify-start font-medium"
                        >
                          {link.label}
                        </Button>
                        <div className="pl-4 space-y-2 border-l-2 border-gray-200 dark:border-gray-700">
                          <Link href="/pools">
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                            >
                              Explore Pools
                            </Button>
                          </Link>
                          <Link href="/pools/create">
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                            >
                              Create Pools
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <Link key={link.label} href={link.destination}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start font-medium"
                        >
                          {link.label}
                        </Button>
                      </Link>
                    )
                  )}
                </div>

                {/* Bottom Section */}
                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="icon" onClick={changeTheme}>
                      {currentTheme === "light" ? <Sun /> : <Moon />}
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
