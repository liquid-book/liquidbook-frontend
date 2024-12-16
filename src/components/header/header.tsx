import useCurrentTheme from "@/hooks/styles/theme";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import { Button } from "../button/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "../sheet/sheet";
import Image from "next/image";

const Header = () => {
  const { setTheme } = useTheme();

  const currentTheme = useCurrentTheme();

  // const { connectors, connect } = useConnect();
  const { address } = useAccount();
  // const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  // const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const links = [
    {
      destination: "/",
      label: "Home",
    },
    {
      destination: "/vision",
      label: "Vision",
    },
    {
      destination: "/",
      label: "Dex",
    },
    {
      destination: "/urls",
      label: "Documentation",
    },
  ];

  const changeTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className=" backdrop-blur-sm fixed w-full border border-b-2 border-gray-100 dark:border-gray-900 flex flex-row justify-between items-center py-2 px-2 lg:px-[5vw] z-50">
      <div className="flex flex-row gap-2">
      <Link href="/" className="flex flex-row gap-2">
          <Image
            src="/logo-w.png"
            alt="Protect.Fi Logo"
            width={30}
            height={30}
            className="object-contain block dark:hidden"
          />
          <Image
            src="/logo.png"
            alt="Protect.Fi Logo"
            width={30}
            height={30}
            className="object-contain hidden dark:block"
          />
          <p className="text-2xl lg:text-3xl font-bold mr-6">Liquid Book</p>
        </Link>
        <div className="hidden lg:flex gap-4">
          {links.map((link) =>
            link.label === 'Pools' ? (
              <div key={link.label} className="relative group">
                {/* Pools Link */}
                <Link href={link.destination} passHref>
                  <Button variant="link" className="relative z-10">
                    {link.label}
                  </Button>
                </Link>

                {/* Dropdown on Hover dengan Animasi */}
                <div
                  className="
                absolute left-1/2 transform -translate-x-1/2 
                top-full 
                bg-white dark:bg-black shadow-xl rounded-xl p-3 w-44 z-20 border border-gray-100
                opacity-0 scale-90 
                group-hover:opacity-100 group-hover:scale-100 
                transition-opacity transition-transform duration-500 ease-out 
                pointer-events-none group-hover:pointer-events-auto
              "
                >
                  <Link href="/pools" passHref>
                    <Button
                      variant="ghost"
                      className="
                    w-full justify-start bg-gray-100 text-sm 
                    hover:bg-gray-200 dark:hover:bg-gray-800 dark:bg-gray-700
                  "
                    >
                      Explore Pools
                    </Button>
                  </Link>
                  <Link href="/pools/create" passHref>
                    <Button
                      variant="ghost"
                      className="
                    w-full justify-start mt-1 bg-gray-100 text-sm 
                    hover:bg-gray-200 dark:hover:bg-gray-800 dark:bg-gray-700
                  "
                    >
                      Create Pools
                    </Button>
                  </Link>
                </div>
              </div>
            ) : link.label === 'Documentation' ? (
              <a
                key={link.label}
                href={link.destination}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Button variant="link">{link.label}</Button>
              </a>
            ) : (
              <Link key={link.label} href={link.destination} passHref>
                <Button variant="link">{link.label}</Button>
              </Link>
            )
          )}

        </div>


      </div>
      <div className="hidden lg:flex gap-2">
        <Button variant="ghost" onClick={changeTheme}>
          {currentTheme === "light" ? <Sun /> : <Moon />}
        </Button>
      </div>

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
                link.label === 'Pools' ? (
                  <div key={link.label} className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start font-medium">
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
                    <Button variant="ghost" className="w-full justify-start font-medium">
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
  );
};

export default Header;
