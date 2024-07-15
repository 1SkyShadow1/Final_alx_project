"use client";

import { useState } from "react";
import { Card, CardContent } from "@/app/ui/card";
import { Input, Label } from "@/app/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/app/ui/dropdown-menu";
import { Button } from "@/app/ui/button";
import { ChevronDownIcon } from "@/app/icons/chevron-down";
import axios from "axios";

interface RegisterAsWorkerFormProps {
  onRegisterSuccess: () => void;
}

const RegisterAsWorkerForm = ({ onRegisterSuccess }: RegisterAsWorkerFormProps) => {
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    services: any[];
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

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  const handleServiceChange = (event: { target: { value: any; checked: any; }; }) => {
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
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/auth/register-worker", FormData);
      // Handle successful registration
      console.log("Worker registration successful:", response.data);
      onRegisterSuccess(); // Call the callback function
    } catch (error) {
      setError((error as any).response.data.message || "Failed to register");
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
              value={FormData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter your email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="Enter your password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Services Provided</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  Select Services <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuCheckboxItem
                  value="plumber"
                  checked={formData.services.includes("plumber")}
                  onChange={handleServiceChange}
                >
                  Plumber
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  value="electrician"
                  checked={formData.services.includes("electrician")}
                  onChange={handleServiceChange}
                >
                  Electrician
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  value="gardener"
                  checked={formData.services.includes("gardener")}
                  onChange={handleServiceChange}
                >
                  Gardener
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  value="domestic_worker"
                  checked={formData.services.includes("domestic_worker")}
                  onChange={handleServiceChange}
                >
                  Domestic Worker
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  value="carpenter"
                  checked={formData.services.includes("carpenter")}
                  onChange={handleServiceChange}
                >
                  Carpenter
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  value="painter"
                  checked={formData.services.includes("painter")}
                  onChange={handleServiceChange}
                >
                  Painter
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  value="handyman"
                  checked={formData.services.includes("handyman")}
                  onChange={handleServiceChange}
                >
                  Handyman
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  value="landscaper"
                  checked={formData.services.includes("landscaper")}
                  onChange={handleServiceChange}
                >
                  Landscaper
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  value="cleaner"
                  checked={formData.services.includes("cleaner")}
                  onChange={handleServiceChange}
                >
                  Cleaner
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  value="babysitter"
                  checked={formData.services.includes("babysitter")}
                  onChange={handleServiceChange}
                >
                  Babysitter
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  value="tutor"
                  checked={formData.services.includes("tutor")}
                  onChange={handleServiceChange}
                >
                  Tutor
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  value="personal_trainer"
                  checked={FormData.services.includes("personal_trainer")}
                  onChange={handleServiceChange}
                >
                  Personal Trainer
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  value="dog_walker"
                  checked={formData.services.includes("dog_walker")}
                  onChange={handleServiceChange}
                >
                  Dog Walker
                </DropdownMenuCheckboxItem>
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

export { RegisterAsWorkerForm, setIsLoading };

function setIsLoading(arg0: boolean) {
  const [isLoading, setIsLoading] = useState<boolean>(arg0);
  return [isLoading, setIsLoading];
}
function setError(arg0: null) {
  throw new Error("Function not implemented.");
}

function onRegisterSuccess() {
  throw new Error("Function not implemented.");
}

