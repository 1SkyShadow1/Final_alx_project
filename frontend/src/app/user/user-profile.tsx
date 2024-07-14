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
    <div className = ''>

    </div>
  );
};