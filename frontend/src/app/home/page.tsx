"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/ui/avatar";
import { Header } from "@/header";
import { DollarSignIcon } from "@/icons/dollar-sign";
import { LocateIcon } from "@/icons/locate";
import { MoonIcon } from "@/icons/moon";
import { MountainIcon } from "@/icons/mountain";
import { StarIcon } from "@/icons/star";
import { SunIcon } from "@/icons/sun";
import Image from "next/image";

interface Gig {
  title: string;
  description: string;
  location: string;
  pay: string; // Change type to string since it's a string
}

interface Professional {
  name: string;
  profession: string;
  rating: number;
  reviews: number;
  imageUrl: string;
}

interface RecommendedGig {
  title: string;
  description: string;
  location: string;
  pay: string;
}

function Component() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [rainbowGlow, setRainbowGlow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  // Use useState for recommended gigs and professionals
  const [recommendedGigs, setRecommendedGigs] =
    useState<RecommendedGig[]>([]);
  const [recommendedProfessionals, setRecommendedProfessionals] =
    useState<Professional[]>([]);

  useEffect(() => {
    // Assuming you have a function to check login status
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("/api/auth/user");
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setRole(data.role);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRainbowGlow((prevState) => !prevState);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetching data example (replace with your actual API calls)
    const fetchRecommendedGigs = async () => {
      try {
        const response = await fetch("/api/recommended-gigs");
        const data: RecommendedGig[] = await response.json();
        setRecommendedGigs(data); // Update state
      } catch (error) {
        console.error("Error fetching recommended gigs:", error);
      }
    };

    const fetchRecommendedProfessionals = async () => {
      try {
        const response = await fetch("/api/recommended-professionals");
        const data: Professional[] = await response.json();
        setRecommendedProfessionals(data); // Update state
      } catch (error) {
        console.error("Error fetching recommended professionals:", error);
      }
    };

    fetchRecommendedGigs();
    fetchRecommendedProfessionals();
  }, []);

  return (
    <div
      className={`flex flex-col min-h-screen bg-gradient-to-br from-[#f0f0f0] to-[#d0d0d0] dark:from-[#1a1a1a] dark:to-[#0a0a0a] ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <Header />
      <main
        className={`flex-1 bg-muted py-8 px-6 md:px-8 ${
          isDarkMode ? "dark" : ""
        } relative`}
      >
        <div className="absolute inset-0 -z-10 bg-cover bg-center opacity-10 dark:opacity-20">
          <Image
            src="/hero.jpg"
            layout="fill"
            objectFit="cover"
            alt="Background Image"
          />
        </div>
        <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold animate-bounce-slow">
              Welcome to GIGSTR
            </h1>
            <p className="text-muted-foreground animate-pulse-slow">
              Explore a world of opportunities and connect with skilled
              professionals across various industries.
            </p>
            <div className="flex gap-4">
              <Input
                placeholder="Search for your dream job or professional"
                className="flex-1 shadow-md shadow-primary/20 dark:shadow-primary/40"
              />
              <Button className="shadow-md shadow-primary/20 dark:shadow-primary/40 animate-bounce-slow hover:scale-110 hover:rotate-12 transition-transform duration-500 ease-in-out">
                Search
              </Button>
            </div>
          </div>
          <Image
            src="/images/hero.jpg"
            width={600}
            height={400}
            alt="GIGSTR Hero Image"
            className="mx-auto aspect-[2/1] overflow-hidden rounded-t-xl object-cover"
          />
        </section>
        <section className="max-w-5xl mx-auto mt-12 overflow-hidden">
          <h2 className="text-2xl font-bold mb-6 animate-bounce-slow">
            Recommended for You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-marquee whitespace-nowrap">
            {/* Only render the map if recommendedProfessionals is an array and has elements */}
            {Array.isArray(recommendedProfessionals) &&
              recommendedProfessionals.length > 0 && (
                recommendedProfessionals.map((professional) => (
                  <Card
                    key={professional.name}
                    className="shadow-md shadow-primary/20 dark:shadow-primary/40 transform transition-transform hover:scale-105 hover:rotate-3 hover:shadow-lg hover:shadow-primary/30 dark:hover:shadow-primary/50"
                  >
                    <CardHeader className="my-class-name">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={professional.imageUrl} className="w-12 h-12" />
                        <AvatarFallback className={undefined}>{professional.name}</AvatarFallback>
                      </Avatar>
                    </CardHeader>
                    <CardContent className="my-class-name">
                      <h3 className="text-xl font-bold">{professional.name}</h3>
                      <p className="text-muted-foreground">
                        {professional.profession}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">
                          {professional.rating}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          ({professional.reviews} reviews)
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="my-class-name">
                      <Link
                        href={`/user/${professional.name}`}
                        className="shadow-md shadow-primary/20 dark:shadow-primary/40 animate-bounce-slow hover:scale-110 hover:rotate-12 transition-transform duration-500 ease-in-out"
                      >
                        <Button
                          variant="outline"
                          className="shadow-md shadow-primary/20 dark:shadow-primary/40 animate-bounce-slow hover:scale-110 hover:rotate-12 transition-transform duration-500 ease-in-out"
                        >
                          View Profile
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))
              )}
          </div>
        </section>
        <section className="max-w-5xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-6 animate-bounce-slow">
            Recommended Jobs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-marquee whitespace-nowrap">
            {/* Only render the map if recommendedGigs is an array and has elements */}
            {Array.isArray(recommendedGigs) && recommendedGigs.length > 0 && (
              recommendedGigs.map((gig) => (
                <Card
                  key={gig.title}
                  className="shadow-md shadow-primary/20 dark:shadow-primary/40 transform transition-transform hover:scale-105 hover:rotate-3 hover:shadow-lg hover:shadow-primary/30 dark:hover:shadow-primary/50"
                >
                  <CardHeader className="my-class-name">
                    <h3 className="text-xl font-bold">{gig.title}</h3>
                  </CardHeader>
                  <CardContent className="my-class-name">
                    <p className="text-muted-foreground">{gig.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <LocateIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {gig.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {gig.pay}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="my-class-name">
                    <Button
                      variant="outline"
                      className="shadow-md shadow-primary/20 dark:shadow-primary/40 animate-bounce-slow hover:scale-110 hover:rotate-12 transition-transform duration-500 ease-in-out"
                    >
                      Apply Now
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </section>
        {isLoggedIn && (
          <section className="max-w-5xl mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-6 animate-bounce-slow">
              {role === "worker"
                ? "Your Active Gigs"
                : "Find Your Next Gig"}
            </h2>
            {role === "worker" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-marquee whitespace-nowrap">
                {/* Display a list of active gigs for the worker */}
                <Link href="/post-a-gig" className="hover:underline" prefetch={false}>
                  Post a Gig
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-marquee whitespace-nowrap">
                {/* Display a list of gigs for the user to browse */}
                <Link href="/gigs" className="hover:underline" prefetch={false}>
                  Browse Gigs
                </Link>
              </div>
            )}
          </section>
        )}
      </main>
      <footer
        className={`bg-muted text-muted-foreground py-8 px-6 md:px-8 ${
          isDarkMode ? "dark" : ""
        } shadow-lg shadow-primary/20 dark:shadow-primary/40`}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-8">
          <div className="space-y-2">
            <h4 className="font-bold">Company</h4>
            <Link
              href="/about"
              className="hover:underline hover:scale-110 transition-transform"
              prefetch={false}
            >
              About
            </Link>
            <br />
            <Link
              href="/careers"
              className="hover:underline hover:scale-110 transition-transform"
              prefetch={false}
            >
              Careers
            </Link>
            <br />
            <Link
              href="/press"
              className="hover:underline hover:scale-110 transition-transform"
              prefetch={false}
            >
              Press
            </Link>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold">Products</h4>
            <Link
              href="/find-jobs"
              className="hover:underline hover:scale-110 transition-transform"
              prefetch={false}
            >
              Find Jobs
            </Link>
            <br />
            <Link
              href="/post-a-job"
              className="hover:underline hover:scale-110 transition-transform"
              prefetch={false}
            >
              Post a Job
            </Link>
            <br />
            <Link
              href="/professionals"
              className="hover:underline hover:scale-110 transition-transform"
              prefetch={false}
            >
              Professionals
            </Link>
          </div>
          <div className="space" />
        </div>
      </footer>
    </div>
  );
}

export default Component;
