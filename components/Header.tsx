

import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Navitems from "./Navitems";
import MobileNav from "./MobileNav";
const Header = () => {
  return (
    <header className="w-full border-b px-10">
      <div className="wrapper flex items-center justify-between">
      <Link href="/" className="w-36 ">
            <Image
              src="/assets/images/logo.png"
              width={80}
              height={40}
              alt="Stock Manager Logo"
            />
          </Link>
       <SignedIn>
        <nav className=" hidden md:flex  w-full max-w-xs">
            <Navitems/>
        </nav>
       </SignedIn>
        <div className="flex w-32 justify-end">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav/>
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;

