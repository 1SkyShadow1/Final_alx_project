 'use client'
 import {Button} from '@/ui/button';
 import Link from 'next/link';
 import {Header} from '@/header';
 import {BellIcon} from '@/icons/bell';
 import {TrashIcon} from '@/icons/trash';
 import {RefreshCwIcon} from '@/icons/refresh-cw';
 import { useEffect, useState } from 'react';

 interface  Notification{
        title: string;
        description: string;
        timestamp: string;
 }

 const NotificationsPage = ()=>{
       const [notifications, setNotifications] = useState<Notification[]>([]);
       useEffect(()=>{
          const fetchNotifications = async()=>{
            try {
                const response = await fetch('/api/notifications');
                const data = await response.json();
                setNotifications(data.notifications);
            } catch (error){
                console.error('Error fetching notifications:',error);
            }
          };
          fetchNotifications();
        }, []);

        return(
          <div className='flex flex-col h-full w-full bg-white p-6'>
            <Header/>
            <h2 className='text-center text-2xl font-bold my-4'>Notifiactions</h2>
              <div className='flex-1 overflow-y-auto bg-["/pattern.svg"] bg-cover bg-no-repeat bg-center'>
                <div className='grid gap-4 p-6'>
                    {
                        notifications.map((notification)=>(
                         <Link
                           key={notification.title + notification.timestamp}
                           href={`/notifications/${notification.title}`}
                           className='flex items-center gap-4 bg-backround rounded-lg p-4 hover:bg--muted/50 transition-colors shadow-lg'
                           prefetch={false}
                         >
                            <BellIcon className ='w-6 h-6 text-primary'/>
                            <div className='flex-1 grid gap-1'>
                                <div className='font-medium'>{notification.title}</div>
                                <div className='text-sm text-muted-foreground line-clamp-1'>
                                    {notification.description}
                                </div>
                            </div>
                            <div className='text-xs text-muted-foreground'>
                                {notification.timestamp}
                            </div>
                         </Link>   
                        ))};
                </div>
            </div>
            <div className='bg-background border-t px-6 py-4 flex items-center justify-between rounded-b-lg shadow-lg'>
                <div className='flex items-center gap-2'>
                    <Button className='' variant='ghost' size='icon'>
                        <TrashIcon className='w-5 h-5 text-primary'/>
                        <span className='sr-only'>Delete</span>
                    </Button>
                    <Button className='' variant='ghost' size='icon'>
                        <RefreshCwIcon className='w-5 h-5 text-primary'/>
                        <span className='sr-only'>Refresh</span>
                    </Button>
                </div>
                <div className='text-sm text-muted-foreground'>
                    4 unread notifications
                </div>
            </div>
        </div>    
    );
 };

 export default NotificationsPage;