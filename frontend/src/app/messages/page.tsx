'use client'
import {Button} from '@/ui/button';
import Link from 'next/link';
import {Avatar, AvatarImage, AvatarFallback} from '@/ui/avatar';
import {Header} from '@/header';
import {PlusIcon} from '@/icons/plus';
import {TrashIcon} from '@/icons/trash';
import {RefreshCwIcon} from '@/icons/refresh-cw';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Message{
    author: {
      firstName: string;
      lastName: string;
      imageUrl: string;
    };
    content: string;
    timestamp: string;
}

const MessagesPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/messages');
        const data = response.data;
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, []);

  const deleteMessage = async (timestamp: string) => {
    try {
      await axios.delete(`/api/messages/${timestamp}`);
      setMessages(messages.filter((message) => message.timestamp !== timestamp));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const refreshMessages = async () => {
    try {
      const response = await axios.get('/api/messages');
      const data = response.data;
      setMessages(data);
    } catch (error) {
      console.error('Error refreshing messages:', error);
    }
  };

  const postMessage = async (newMessage: Message) => {
    try {
      const response = await axios.post('/api/messages', newMessage);
      const data = response.data;
      setMessages([...messages, data]);
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  return (
    <div className='flex flex-col h-full w-full bg-dark p-6'>
      <Header />
      <h2 className='text-center text-2xl font-bold my-4'>Messages</h2>
      <div className='flex-1 overflow-y-auto bg-[url("/pattern.svg")] bg-cover bg-no-repeat bg-center'>
        <div className='grid gap-4 p-6'>
          {messages.map((message) => (
            <Link
              key={message.author.firstName + message.timestamp}
              href={`/messages/${message.timestamp}`}
              className='flex items-center gap-4 bg-background rounded-lg p-4 hover:bg-muted/50 transition-colors shadow-lg'
              prefetch={false}
            >
              <Avatar className='w-12 h-12'>
                <AvatarImage className='' src={message.author.imageUrl} />
                <AvatarFallback className=''>
                  {message.author.firstName[0]}
                  {message.author.lastName}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1 grid gap-1'>
                <div className='font-medium'>
                  {message.author.firstName} {message.author.lastName}
                </div>
                <div className='text-sm text-muted-forground line-clamp-1'>
                  {message.content}
                </div>
              </div>
              <div className='text xs text-muted-foreground'>
                {message.timestamp}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className='bg-background border-t px-6 py-4 flex items-center justify-between rounded-b-lg shadow-lg'>
        <div className='flex items-center gap-2'>
          <Button
            className=''
            variant='ghost'
            size='icon'
            onClick={() => deleteMessage(messages[0].timestamp)}
          >
            <TrashIcon className='w-5 h-5 text-primary' />
            <span className='sr-only'>Delete</span>
          </Button>
          <Button
            className=''
            variant='ghost'
            size='icon'
            onClick={refreshMessages}
          >
            <RefreshCwIcon className='w-5 h-5 text primary' />
            <span className='sr-only'>Refresh</span>
          </Button>
        </div>
        <div className='text-sm text-muted-foreground'>
          {messages.length} messages
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;