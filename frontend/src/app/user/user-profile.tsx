'use client'
import {Avatar, AvatarImage, AvatarFallback} from  '@/app/ui/avatar';
import {Badge} from '@/app/ui/badge';
import {Separator} from '@/app/ui/separator';
import {StarIcon} from '@/app/icons/star';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import { HammerIcon } from '../icons/hammer';
import { PlugIcon } from '@/app/icons/plug';
import {MailsIcon} from '@/app/icons/mails';
import {MessagesSquareIcon} from '@/app/icons/messages-square';

interface User {
  firstName: string;
  lastName: string;
  profession: string;
  imageUrl: string;
  bio: string;
  services: string[];
  reviews: {
    _id: string;
    author:{
      firstName: string;
      lastName: string;
      imageUrl: string;
    };
    rating: number;
    content: string;    
    }[];
  }    

const userProfile = ({userId}: {userId:string}) =>{
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () =>{
    try{
    const response = await axios.get(`/api/users/${userId}`);
    setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }
  
  useEffect(()=>{
    fetchUser();
  }, [userId]);

  if(!user){
    return <div>Loading...</div>
  }

  return(
    <div className = 'w-full max-w-5xl mx-auto py-8 md:py-12 px-4 md:px-6'>
     <div className = 'bg-black text-white w-full max-w-5xl mx-auto py-4 md:py-6 px-4 md:px-6'>
      <div className = 'flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href ="/" className='flex items-center gap-2 hover:text-primary-foreground' prefetch={false}>
            <PlugIcon className='w-6 h-6'/>
            <HammerIcon className='w-6 h-6'/>
            <h1 className='text-2xl font-bold animate-bounce'>Gigstr</h1>
          </Link>
        </div>
        <div className='flex items-center gap-4'>
          <Link href='/about' className='inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-primary-foreground' prefetch={false}>
           About
          </Link>
          <Link href='/professionals' className='inline-flex h-9 items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible-ring disabled:pointer-events-none disabled:opacity-50 hover:text-secondary-foreground' prefetch={false}>
            Gigs
          </Link>
        </div>
      </div>
    </div>
    <div className='mt-8 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8'>
      <div className='flex-shrink-0'>
        <Avatar className='w-24 h-24 md:w-32 md:h-32 md:h-32 border-4 border-primary'>
          <AvatarImage src= {user.imageUrl}/>
          <AvatarFallback>
            {user.firstName}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className ='flex-1 grid gap-4'>
        <div className='flex items-center justify-between'>
          <div className='grid gap-1'>
            <h1 className='text-2xl font-bold'>
              {user.firstName} {user.lastName}
            </h1>
            <div className='text-sm txt-muted-foreground'>
              {user.profession}
            </div>
          </div>
          <div className ='flex items-center gap-2'>
            <StarIcon className='w-5 h-5 fill-primary'/>
            <div className='text-lg font-semibold'>4.8</div>
              <div className='text-sm text-muted-foreground'>
                (124 reviews)
              </div>
            </div>
            <div  className = 'prose max-w-none'>
              <p>
                {user.bio}
              </p>
            </div>
            <div className='grid gap-2'>
              <div className='text-sm font-semibold'>Services Provided</div>
              <div className='flex flex-wrap gap-2'>
                  {user.services.map((service) =>(
                    <Badge key={service} className='hover:bg-primary hover:text-primary'>
                      {service}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <Separator className='my-8 md:my-12' />
        <div className ='grid gap-8' >
        <h2 className='text-xl font-semibold'>Reviews</h2>
        <div className='grid gap-6 mt-4'>
         {user.reviews.map((review) =>(
          <div key ={review._id} className='flex items-start gap-4'>
           <Avatar>
            <AvatarImage src={review.author.imageUrl}/>
            <AvatarFallback>
              {review.author.firstName}
            </AvatarFallback>
           </Avatar>
           <div className='flex-1 grid gap-2'>
              <div className='flex items-center justify-between'>
                <div className='font-medium'>
                 {review.author.firstName} {review.author.lastName}
                </div>
                <div className='flex items-center gap-1 text-sm'>
                  {[...Array(review.rating)].map((_, index) =>(   
                    <StarIcon key={index} className='w-4 h-4 fill-primary'/>
                  ))}
                </div>
              </div>
              <div className='text-sm text-muted-foreground'>
                    {review.content}
            </div>
           </div>
          </div>
         ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default userProfile;