import React from "react";
import Logo from "./icons/Logo";

const Navbar = () => {
  return (
    <nav className="h-[10dvh] flex justify-between items-center py-4">
      <div className="flex  items-center gap-2">
        <Logo />
        <div className="flex flex-col">
          <span className="items-center text-3xl font-extrabold text-primary flex gap-2">
            Wallet.dev{" "}<span className="rounded-full text-base bg-slate-100 px-2">v1.1</span>
          </span>
        </div>
      </div>

      <p>topggle theme</p>
    </nav>
  );
};

export default Navbar;
