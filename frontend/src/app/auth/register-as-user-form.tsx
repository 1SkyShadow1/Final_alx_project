"use client";

import { useState } from "react";
import { Card, CardContent } from "@/ui/card";
import { Input, Label } from "@/ui/input";
import { Button } from "@/ui/button";
import axios from "axios";

interface RegisterAsUserFormProps {
  onRegisterSuccess: () => void;
}

const RegisterAsUserForm = ({ onRegisterSuccess }: RegisterAsUserFormProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/auth/register-user", formData);
      // Handle successful registration
      console.log("User registration successful:", response.data);
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
            <Label className =''htmlFor="firstName">First Name</Label>
            <Input
              className= ''
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label className= '' htmlFor="lastName">Last Name</Label>
            <Input
              className= ''
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label className='' htmlFor="email">Email</Label>
            <Input
            className=''
              id="email"
              name="email"
              placeholder="Enter your email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label className='' htmlFor="password">Password</Label>
            <Input
            className=''
              id="password"
              name="password"
              placeholder="Enter your password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label className='' htmlFor="confirmPassword">Confirm Password</Label>
            <Input
             className=''
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
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

export { RegisterAsUserForm };