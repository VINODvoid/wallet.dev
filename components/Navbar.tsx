import React from "react";
import Logo from "./icons/Logo";
import { ModeToggle } from "./ui/theme-button";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4">
      <div className="flex  items-center gap-2">
        <Logo />
        <div className="flex flex-col">
          <span className="tracking-tighter items-center text-3xl font-extrabold text-primary flex gap-2 ">
            Wallet.dev{" "}<span className="rounded-full text-base bg-primary/10 border border-primary/50 px-2">v1.1</span>
          </span>
        </div>
      </div>

      <ModeToggle/>
    </nav>
  );
};

export default Navbar;
