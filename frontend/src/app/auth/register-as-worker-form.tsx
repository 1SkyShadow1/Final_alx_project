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
  const [FormData, setFormData] = useState<{
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
            <Label className='' htmlFor="firstName">First Name</Label>
            <Input
            className={''}
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              value={FormData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label className={''} htmlFor="lastName">Last Name</Label>
            <Input
            className={''}
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              value={FormData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label className={''} htmlFor="email">Email</Label>
            <Input className={''}
              id="email"
              name="email"
              placeholder="Enter your email"
              type="email"
              value={FormData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label className={''} htmlFor="password">Password</Label>
            <Input className={''}
              id="password"
              name="password"
              placeholder="Enter your password"
              type="password"
              value={FormData.password}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="">Confirm Password</Label>
            <Input className={''}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              type="password"
              value={FormData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="services" className="">Services Provided</Label>
            <DropdownMenu className={''}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  Select Services <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuCheckboxItem
                  value="plumber"
                  checked={FormData.services.includes("plumber")}
                  onChange={handleServiceChange}
                >
                  Plumber
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  value="electrician"
                  checked={FormData.services.includes("electrician")}
                  onChange={handleServiceChange}
                >
                  Electrician
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  value="gardener"
                  checked={FormData.services.includes("gardener")}
                  onChange={handleServiceChange}
                >
                  Gardener
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  value="domestic_worker"
                  checked={FormData.services.includes("domestic_worker")}
                  onChange={handleServiceChange}
                >
                  Domestic Worker
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  value="carpenter"
                  checked={FormData.services.includes("carpenter")}
                  onChange={handleServiceChange}
                >
                  Carpenter
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  value="painter"
                  checked={FormData.services.includes("painter")}
                  onChange={handleServiceChange}
                >
                  Painter
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  value="handyman"
                  checked={FormData.services.includes("handyman")}
                  onChange={handleServiceChange}
                >
                  Handyman
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  value="landscaper"
                  checked={FormData.services.includes("landscaper")}
                  onChange={handleServiceChange}
                >
                  Landscaper
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  value="cleaner"
                  checked={FormData.services.includes("cleaner")}
                  onChange={handleServiceChange}
                >
                  Cleaner
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  value="babysitter"
                  checked={FormData.services.includes("babysitter")}
                  onChange={handleServiceChange}
                >
                  Babysitter
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  value="tutor"
                  checked={FormData.services.includes("tutor")}
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
                  checked={FormData.services.includes("dog_walker")}
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

