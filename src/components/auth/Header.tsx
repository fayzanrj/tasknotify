import React from "react";
import Logo from "../Logo";
import Link from "next/link";
import ThemeToggleNavbarBtn from "../landingPage/LandingThemeToggleBtn";

const Header: React.FC = () => {
  return (
    <header className="text-center relative">
      {/* Logo */}
      <Link href={"/"}>
        <Logo />
      </Link>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
        <ThemeToggleNavbarBtn />
      </div>
    </header>
  );
};

export default Header;
