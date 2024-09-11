"use client";

import { useState, useEffect } from "react";
import { Header } from "../header";

const ContactPage = () => {
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
            Contact Us
          </h1>
          <p className="text-muted-foreground text-lg animate-pulse-slow">
            Have a question, suggestion, or feedback?  We&apos;d love to hear from
            you. 
          </p>

          <h2 className="text-2xl font-bold animate-bounce-slow">
            Team Gigstr
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Partner 1 - Evans Ncube
              </h3>
              <ul className="text-muted-foreground text-lg animate-pulse-slow list-disc list-inside">
                <li>
                  <a
                    href="https://github.com/1SkyShadow1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/evans-ncube-b3a4a322a/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="tel:+27692165481" target="_blank" rel="noopener noreferrer">
                    Phone: +27692165481
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Partner 2 - Jonathan Ndawula
              </h3>
              <ul className="text-muted-foreground text-lg animate-pulse-slow list-disc list-inside">
                <li>
                  <a
                    href="https://github.com/JonaNdawula"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/jonathan-ndawula-baa819137/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="tel:+256780394081" target="_blank" rel="noopener noreferrer">
                    Phone: +256780394081
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;