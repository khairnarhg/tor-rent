"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-center">
        <Link href="/" className="text-5xl font-extrabold text-primary">
          Tor-Rent
        </Link>
      </div>
    </header>
  );
};

export default Header;
