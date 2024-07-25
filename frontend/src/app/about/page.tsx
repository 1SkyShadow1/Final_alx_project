"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "../header";

const AboutPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsDarkMode((prevState) => !prevState);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`flex flex-col min-h-screen bg-gradient-to-br from-[#f0f0f0] to-[#d0d0d0] dark:from-[#1a1a1a] dark:to-[#0a0a0a] ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <Header />
      <main className="flex-1 bg-muted py-8 px-6 md:px-8">
        <section className="max-w-5xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold animate-bounce-slow">
            About Gigstr
          </h1>
          <p className="text-muted-foreground text-lg animate-pulse-slow">
            Gigstr is a revolutionary platform connecting you with skilled
            professionals in your area. We are passionate about bridging the
            gap between those seeking quality services and talented individuals
            who often go unnoticed. 
          </p>

          <h2 className="text-2xl font-bold animate-bounce-slow">Our Mission</h2>
          <p className="text-muted-foreground text-lg animate-pulse-slow">
            Our mission is to create a fair and accessible marketplace where
            everyone can find the help they need and connect with talented
            individuals. We strive to empower workers and provide opportunities
            for them to showcase their skills and grow their businesses.
          </p>

          <h2 className="text-2xl font-bold animate-bounce-slow">
            Our Values
          </h2>
          <ul className="text-muted-foreground text-lg animate-pulse-slow list-disc list-inside">
            <li>Integrity: We operate with honesty and transparency.</li>
            <li>Quality: We prioritize delivering high-quality services.</li>
            <li>Accessibility: We aim to make our platform accessible to everyone.</li>
            <li>Innovation: We are always looking for ways to improve.</li>
            <li>Community: We believe in supporting our community of users.</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;