'use client';

import {LoginForm} from '@/app/auth/login-form';
import {Header} from '@/app/header';

const LoginPage = () =>{
    return(
      <div className='flex flex-col min-h-dvh'>
       <Header/>
        <main
          className='flex-1 flex items-center py-12 md:py-24 lg:py-32'
        >
            <div className='container px-4 md:px-6'>
              <LoginForm/>
            </div>
        </main>
      </div>    
    );
};

export default LoginPage;