"use client";

import Link from "next/link";
import { HammerIcon } from "../icons/hammer";
import { PlugIcon } from "../icons/plug"
import WorkerRegistrationForm from "../auth/WorkerRegistrationForm";
import UserRegistrationForm from "../auth/userRegistrationForm";
import LoginForm from "../auth/LoginForm";
import { useState, useEffect } from "react";
import { Button } from "@/ui/button";

interface FormState {
  currentForm: 'worker' | 'user' | 'login';
}

export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [rainbowGlow, setRainbowGlow] = useState(false);
  const [currentForm, setCurrentForm] = useState<FormState['currentForm']>('worker'); 

  useEffect(() => {
    const interval = setInterval(() => {
      setRainbowGlow((prevState) => !prevState);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleFormChange = (form: FormState['currentForm']) => {
    setCurrentForm(form);
  };

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="bg-black px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <PlugIcon className="size-6 text-white" />
          <HammerIcon className="size-6 ml-2 text-white" />
          <span className="font-bold text-lg text-white">Gigstr</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/how-it-works" className="text-sm font-medium hover:underline underline-offset-4 text-white" prefetch={false}>
            How It Works
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4 text-white" prefetch={false}>
            Pricing
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4 text-white" prefetch={false}>
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4 text-white" prefetch={false}>
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Connect with Overlooked Workers
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Gigstr is the app that connects you with plumbers, electricians, gardeners, and domestic workers in
                  your area. Get the help you need, when you need it.
                </p>
                <div className="space-x-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => handleFormChange('worker')}
                    className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Register as a Worker
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleFormChange('user')}
                    className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Register as a User
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleFormChange('login')}
                    className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Login
                  </Button>
                </div>
              </div>
              <img
                src="/placeholder.svg"
                width="1270"
                height="300"
                alt="Hero"
                className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover"
              />
            </div>
          </div>
        </section>
        {/* Rest of the content (unchanged) */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 md:px-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">Register as a Gigstr Worker</h2>
              <p className="text-lg text-muted-foreground">
                Join the Gigstr platform and start offering your services to people in need.
              </p>
            </div>
            {currentForm === 'worker' && <WorkerRegistrationForm onRegisterSuccess={() => handleFormChange('login')}/>}
            {currentForm === 'user' && <UserRegistrationForm onRegisterSuccess={() => handleFormChange('login')}/>}
            {currentForm === 'login' && <LoginForm onLoginSuccess={() => handleFormChange('worker')}/>}
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">What Our Users Say</h2>
              <p className="text-lg text-muted-foreground">
                Hear from the people who have used Gigstr and their experiences with our platform.
              </p>
            </div>
            {/* Testimonials content (unchanged) */}
          </div>
        </section>
      </main>
    </div>
  );
}