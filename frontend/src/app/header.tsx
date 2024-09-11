"use client";

import Link from "next/link";
import { Button } from "@/ui/button";
import { HammerIcon } from "@/icons/hammer";
import { PlugIcon } from "@/icons/plug";
import { MenuIcon } from "@/icons/menu";
import { XIcon } from "@/icons/x";
import { MailsIcon } from "@/icons/mails";
import { MessagesSquareIcon } from "@/icons/messages-square";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className='bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between'>
    <Link href='/home'
      className = 'text-xl font-bold flex items-center gap-2 animate-none'
      prefetch={false}
      >
        <PlugIcon className="size-6 text-white" />
        <HammerIcon className="size-6 ml-2 text-white" />
        <span className="font-bold text-lg text-white">Gigstr</span>
      </Link>
      <nav
        className={cn(
          "hidden md:flex items-center gap-6",
          isMenuOpen && "md:hidden"
        )}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 hover:text-primary-foreground">
          <Link href="/gigs" className="hover:underline" prefetch={false}>
          Gigs
          </Link>
          <Link href='/notifications' className="hover:underline" prefetch={false}>
              Notifications
          </Link>
          </div>
          <div className="flex items-center gap-2 hover:text-primary-foreground">
            <Link href='/messages' className="hover:underline" prefetch={false}>
              Messages
            </Link>
          </div>
          <div className="flex items-center gap-2 hover:text-primary-foreground">
            <Link href='/contact' className="hover:underline" prefetch={false}>
              Contact
            </Link>
          </div>
        </div>
        <Link href="/about" className="hover:underline" prefetch={false}>
          About
        </Link>
        <div className="flex items-center gap-2 hover:text-primary-foreground">
        <Link href="/user-profile/[id]" as="/user-profile/1" className="hover:underline" prefetch={false}>
        Profile
        </Link>

        </div>
       <Link href='/' className="hover:underline" prefetch={false}>
       Logout
       </Link>
      </nav>
      <Button
        variant="outline"
        className={cn("md:hidden", isMenuOpen && "hidden")}
        onClick={toggleMenu}
      >
        <MenuIcon className="w-5 h-5" />
      </Button>
      <Button
        variant="outline"
        className={cn("md:hidden", !isMenuOpen && "hidden")}
        onClick={toggleMenu}
      >
        <XIcon />
      </Button>
    </header>
  );
};

export { Header };