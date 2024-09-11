// "use client"; 

// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import LoadingSpinner from '@/ui/LoadingSpinner'; // Make sure this path is correct
// import UserProfile from '@/user/page'; // Path to your presentation component

// interface User {
//     _id: string; // Or however your user ID is structured
//     firstName: string;
//     lastName: string;
//     profession: string; 
//     imageUrl: string;
//     bio: string;
//     services: string[]; 
//     reviews: {
//         _id: string;
//         author: {
//             firstName: string;
//             lastName: string;
//             imageUrl: string;
//         };
//         rating: number;
//         content: string;
//     }[];
//     userType: "worker" | "employer"; 
// }

// const UserProfilePage = ({ params }: { params: { id: string } }) => {
//     const router = useRouter();
//     const { id } = params;
//     const [user, setUser] = useState<User | null>(null);
//     const [isLoading, setIsLoading] = useState(true);

//     const fetchUser = useCallback(async () => {
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`/api/users/${id}`); 
//             setUser(response.data);
//         } catch (error) {
//             console.error("Error fetching user:", error);
//             // More robust error handling:
//             // router.push('/error?message=Failed to load profile'); // Example
//         } finally {
//             setIsLoading(false);
//         }
//     }, [id]);

//     useEffect(() => {
//         fetchUser();
//     }, [fetchUser]);

//     if (isLoading) {
//         return <LoadingSpinner />; 
//     }

//     if (!user) {
//         // You can make this more user-friendly with styling
//         return <div>User not found. </div>; 
//     }

//     return (
//         <div>
//             <UserProfile user={user} /> 
//         </div>
//     );
// };

// export default UserProfilePage;