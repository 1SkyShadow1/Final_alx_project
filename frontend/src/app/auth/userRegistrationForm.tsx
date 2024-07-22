import { Card, CardContent } from "@/ui/card";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/ui/button";

interface UserRegistrationFormProps {
  onRegisterSuccess: () => void;
}

const UserRegistrationForm = ({ onRegisterSuccess }: UserRegistrationFormProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log("Form Data: ", formData); // Added console.log for debugging
      const response = await axios.post("/api/auth/register-user", { // Correct endpoint
        ...formData,
        role: "user", // Add role to the request
      });
      // Handle successful registration
      console.log("User registration successful:", response.data);
      onRegisterSuccess(); // Call the callback function
    } catch (error) {
      console.log("Error during registration: ", error); // Added console.log for debugging
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || "Failed to register");
      } else {
        setError("Failed to register");
      }
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

export default UserRegistrationForm;