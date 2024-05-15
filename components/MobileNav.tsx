"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from "next/image"
import Navitems from "./Navitems"
import { Separator } from "@radix-ui/react-separator"
  
const MobileNav = () => {
  return (
   <nav className="md:hidden">
  
  <Sheet>
  <SheetTrigger>
    <Image src ="/assets/icons/menu.svg"  alt ="menu"height={30} width={30} className="cursor-pointer"/>
  </SheetTrigger>
  <SheetContent  className="flex flex-col gap-6 bg-white">
    
  <Image src ="/assets/images/logo.svg"  alt ="logo"height={30} width={120} />
  <Separator className="border border-gray-200" />
     <Navitems/>
  </SheetContent>
</Sheet>

   </nav>
  )
}

export default MobileNav