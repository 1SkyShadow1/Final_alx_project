"use client";

import { UserProfile } from "@/app/user/user-profile";
import axios from "axios";
import { useState, useEffect } from "react";

interface User {
  firstName: string;
  lastName: string;
  profession: string;
  imageUrl: string;
  bio: string;
  services: string[];
  reviews: {
    _id: string;
    author: {
      firstName: string;
      lastName: string;
      imageUrl: string;
    };
    rating: number;
    content: string;
  }[];
}

const UserProfilePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      // Assuming the API endpoint is '/api/users/id' 
      const response = await axios.get(`/api/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Pass the 'user' object as a prop to the UserProfile component */}
      <UserProfile userId={id} user={user} /> 
    </div>
  );
};

export default UserProfilePage;
