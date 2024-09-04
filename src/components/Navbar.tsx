"use client";

import Link from "next/link";
import { FC } from "react";

const Navbar: FC = () => {
  return (
    <nav className="bg-transparent py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Jogo do Bicho
        </div>
        <div className="space-x-4 font-bold">
          <Link href="/" className="text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300">
            Home
          </Link>
          <Link href="/contraventor" className="text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300">
            Contraventores
          </Link>
          <Link href="/cliente" className="text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300">
            Cliente
          </Link>
          <Link href="/bicho" className="text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300">
            Bicho
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
