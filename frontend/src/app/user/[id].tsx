"use client";

import UserProfile from "@/user/user-profile";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";

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

const UserProfilePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      // Assuming the API endpoint is '/api/users/id' 
      const response = await axios.get(`/api/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchUser(); 
  }, [fetchUser]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UserProfile userId={id}/> 
    </div>
  );
};

export default UserProfilePage;