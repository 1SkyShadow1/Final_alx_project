"use client";

import Link from "next/link";
import { Button } from "@/app/ui/button";
import { HammerIcon } from "@/app/icons/hammer";
import { PlugIcon } from "@/app/icons/plug";
import { MenuIcon } from "@/app/icons/menu";
import { XIcon } from "@/app/icons/x";
import { MailsIcon } from "@/app/icons/mails";
import { MessagesSquareIcon } from "@/app/icons/messages-square";
import { useState } from "react";
import { cn } from "@/app/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-black px-4 lg:px-6 h-14 flex items-center">
      <Link
        href="/"
        className="flex items-center justify-center"
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
            <Button variant="ghost" size="icon" className="hover:text-primary-foreground">
              <MailsIcon className="w-6 h-6" />
              <span className="sr-only">Notifications</span>
            </Button>
            <span className="text-sm text-muted-foreground">
              Notifications
            </span>
          </div>
          <div className="flex items-center gap-2 hover:text-primary-foreground">
            <Button variant="ghost" size="icon" className="hover:text-primary-foreground">
              <MessagesSquareIcon className="w-6 h-6" />
              <span className="sr-only">Messages</span>
            </Button>
            <span className="text-sm text-muted-foreground">Messages</span>
          </div>
        </div>
        <Link href="/about" className="hover:underline" prefetch={false}>
          About
        </Link>
        <Link href="/professionals" className="hover:underline" prefetch={false}>
          Professionals
        </Link>
        <Link href="/gigs" className="hover:underline" prefetch={false}>
          Gigs
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
        <XIcon className="w-5 h-5" />
      </Button>
    </header>
  );
};

export { Header };