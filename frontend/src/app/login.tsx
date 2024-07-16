'use client';

import {LoginForm} from '@/auth/login-form';
import {Header} from '@/header';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
	navigate('/dashboard'); 
  };

  return (
	<div className='flex flex-col min-h-dvh'>
	  <Header/>
	  <main className='flex-1 flex items-center py-12 md:py-24 lg:py-32'>
		<div className='container px-4 md:px-6'>
		  <LoginForm onLoginSuccess={handleLoginSuccess}/>
		</div>
	  </main>
	</div>
  );
};

