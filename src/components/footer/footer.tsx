import { useTheme } from "next-themes";

const Footer = () => {
  const { theme, setTheme } = useTheme();

  return (
    <footer className={"border-t-2 border-solid border-gray-100 dark:border-gray-900 lg:mb-4 py-2 px-2 lg:px-[15vw]"}>
      
    </footer>
  );
};

export default Footer;
