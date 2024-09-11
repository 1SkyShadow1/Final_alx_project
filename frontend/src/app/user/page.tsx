import { Avatar, AvatarImage, AvatarFallback } from '@/ui/avatar';
import Badge from '@/ui/badge';
import { Separator } from '@/ui/separator';
import { StarIcon } from '@/icons/star';
import Link from 'next/link';
import { HammerIcon } from '../icons/hammer'; 
import { PlugIcon } from '@/icons/plug'; 

interface User { 
    _id: string; // Or your ID structure
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
    userType: "worker" | "employer"; 
}

interface UserProfileProps {
    user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
    return (
        <div className="w-full max-w-5xl mx-auto py-8 md:py-12 px-4 md:px-6">
            <div className="bg-black text-white w-full max-w-5xl mx-auto py-4 md:py-6 px-4 md:px-6">
                {/* ... (Navigation - Keep this the same for now) */} 
            </div>

            <div className="mt-8 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                <div className="flex-shrink-0">
                    <Avatar className="w-24 h-24 md:w-32 md:h-32 md:h-32 border-4 border-primary">
                        <AvatarImage className="" src={user.imageUrl} />
                        <AvatarFallback className="">{user.firstName}</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex-1 grid gap-4"> 
                    {/* ... (Basic Profile Info - Keep this section largely unchanged) ... */}

                    {/* Dynamically Rendered Content */}
                    <div className="profile-content">
                        {user.userType === 'worker' && (
                            <div>
                                {/* Worker-specific details */}
                                <div className="grid gap-2">
                                    <div className="text-sm font-semibold">Services Provided</div>
                                    <div className="flex flex-wrap gap-2">
                                        {user.services.map((service) => (
                                            <Badge key={service} className="hover:bg-primary hover:text-primary">
                                                {service}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>  
                            </div>
                        )}

                        {user.userType === 'employer' && (
                            <div>
                                {/* Employer-specific details */}
                                <p>Company Name: {/* Add logic to get company name */}</p>
                                <p>Job Postings: {/* Link to employer job listings */}</p>
                            </div>
                        )}
                    </div> 
                </div>
            </div>
            <Separator className="my-8 md:my-12" />
            {/* ... (Reviews section - Keep this as is for now) ... */}
        </div>
    );
};

export default UserProfile;