"use client";

import { Card, CardContent } from "@/ui/card";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/ui/dropdown-menu";
import { Button } from "@/ui/button";
import { ChevronDownIcon } from "@/icons/chevron-down"; // 
import { useState } from "react";
import axios from "axios";

interface WorkerRegistrationFormProps {
  onRegisterSuccess: () => void;
}

const WorkerRegistrationForm = ({ onRegisterSuccess }: WorkerRegistrationFormProps) => {
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    services: string[];
  }>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    services: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  
  const handleServiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        services: [...prevFormData.services, value],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        services: prevFormData.services.filter((service) => service !== value),
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/auth", {
        ...formData,
        role: "worker", // Add role to the request
      });
      // Handle successful registration
      console.log("Worker registration successful:", response.data);
      onRegisterSuccess(); // Call the callback function
    } catch (error: any) {
      setError(error.response.data.message || "Failed to register");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange} className={undefined}            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange} className={undefined}            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter your email"
              type="email"
              value={formData.email}
              onChange={handleChange} className={undefined}            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="Enter your password"
              type="password"
              value={formData.password}
              onChange={handleChange} className={undefined}            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange} className={undefined}            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={undefined}>Services Provided</Label>
            <DropdownMenu className={undefined}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  Select Services
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuCheckboxItem value="plumber" checked={formData.services.includes("plumber")} onChange={handleServiceChange}>Plumber</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem value="electrician" checked={formData.services.includes("electrician")} onChange={handleServiceChange}>Electrician</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem value="gardener" checked={formData.services.includes("gardener")} onChange={handleServiceChange}>Gardener</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem value="domestic_worker" checked={formData.services.includes("domestic_worker")} onChange={handleServiceChange}>Domestic Worker</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem value="carpenter" checked={formData.services.includes("carpenter")} onChange={handleServiceChange}>Carpenter</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem value="painter" checked={formData.services.includes("painter")} onChange={handleServiceChange}>Painter</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem value="handyman" checked={formData.services.includes("handyman")} onChange={handleServiceChange}>Handyman</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem value="landscaper" checked={formData.services.includes("landscaper")} onChange={handleServiceChange}>Landscaper</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem value="cleaner" checked={formData.services.includes("cleaner")} onChange={handleServiceChange}>Cleaner</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem value="babysitter" checked={formData.services.includes("babysitter")} onChange={handleServiceChange}>Babysitter</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem value="tutor" checked={formData.services.includes("tutor")} onChange={handleServiceChange}>Tutor</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem value="personal_trainer" checked={formData.services.includes("personal_trainer")} onChange={handleServiceChange}>Personal Trainer</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem value="dog_walker" checked={formData.services.includes("dog_walker")} onChange={handleServiceChange}>Dog Walker</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {error && (
            <div className="text-red-500 text-sm font-medium">
              {error}
            </div>
          )}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WorkerRegistrationForm;
