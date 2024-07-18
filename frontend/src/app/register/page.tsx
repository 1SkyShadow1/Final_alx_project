"use client";

import { RegisterAsUserForm } from "@/auth/register-as-user-form";
import { Header } from "@/header";

const RegisterAsUserPage = () => {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <RegisterAsUserForm onRegisterSuccess={function (): void {
            throw new Error("Function not implemented.");
          } } />
        </div>
      </main>
    </div>
  );
};

export default RegisterAsUserPage;