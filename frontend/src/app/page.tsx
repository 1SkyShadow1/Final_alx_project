"use client";

import Link from "next/link";
import { HammerIcon } from "./icons/hammer";
import { PlugIcon } from "./icons/plug"
import WorkerRegistrationForm from "./auth/WorkerRegistrationForm";
import UserRegistrationForm from "./auth/userRegistrationForm";
import LoginForm from "./auth/LoginForm";
import { useState, useEffect } from "react";
import { Button } from "@/ui/button";

interface FormState {
  currentForm: 'worker' | 'user' | 'login';
}

interface Testimonial {
  id: number;
  name: string;
  comment: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    comment: "Gigstr helped me find a reliable plumber in my area. Highly recommended!"
  },
  {
    id: 2,
    name: "Jane Smith",
    comment: "I registered as a worker on Gigstr and started getting job offers right away. Great platform!"
  },
  {
    id: 3,
    name: "Mike Johnson",
    comment: "The login process on Gigstr is seamless. I can access my account with just a few clicks."
  }
];

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

  let formTitle = '';
  if (currentForm === 'worker') {
    formTitle = 'Register as a Gigstr Worker';
  } else if (currentForm === 'user') {
    formTitle = 'Register as a Gigstr User';
  } else if (currentForm === 'login') {
    formTitle = 'Sign in to Gigstr';
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="bg-black px-4 lg:px-6 h-14 flex items-center">
          <PlugIcon className="size-6 text-white" />
          <HammerIcon className="size-6 ml-2 text-white" />
          <span className="font-bold text-lg text-white">Gigstr</span>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/how-it-works" className="text-sm font-medium hover:underline underline-offset-4 text-white" prefetch={false}>
            How It Works
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4 text-white" prefetch={false}>
            Pricing
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
                src="/images/home.jpg"
                width="700"
                height="600"
                alt="Hero"
                className="mx-auto aspect-[2/1] overflow-hidden rounded-t-xl object-cover"
              />
            </div>
            
          </div>
        </section>
        {/* Rest of the content (unchanged) */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 md:px-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">{formTitle}</h2>
              {currentForm === 'worker' && (
                <p className="text-lg text-muted-foreground">
                  Join the Gigstr platform and start offering your services to people in need.
                </p>
              )}
              {currentForm === 'user' && (
                <p className="text-lg text-muted-foreground">
                  Join the Gigstr platform and start using our services to find workers in your area.
                </p>
              )}
              {currentForm === 'login' && (
                <p className="text-lg text-muted-foreground">
                  Sign in to Gigstr and access your account.
                </p>
              )}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-dark p-6 rounded-lg shadow-md">
                  <p className="text-lg font-medium">{testimonial.comment}</p>
                  <p className="mt-2 text-sm text-gray-500">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}