import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
const Header = () => {
  return (
    <div>
      <header className="w-full border-b">
        <div className="wrapper flex items-center justify-between">
          <Link href="/" className="w-36 ">
            <Image
              src="/assets/images/logo2.svg"
              width={130}
              height={40}
              alt="Hoster Logo"
            />
          </Link>
          <SignedIn>
            <nav className="md:flex-between hidden w-full max-w-xs">
              fasdfdsfdsf
            </nav>
          </SignedIn>
          <div className="flex w-80 justify-end mr-20">
            <SignedIn>
              <div className="w-full flex justify-end h-40 ml-12 ">
                {" "}
                
                <UserButton afterSignOutUrl="/"  />
              </div>
            </SignedIn>
            <SignedOut>
              <button className="rounded-full ">
                <Link href="/sign-in">login</Link>
              </button>
            </SignedOut>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
