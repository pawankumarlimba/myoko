'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const Header = () => {
  // Retrieve auth token or user identifier from cookies (adjust key as needed)
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    !!Cookies.get('accessToken')
  );

  const handleLogout = async () => {
    try {
      console.log('Attempting logout...');

      const response = await axios.post(
        'http://localhost:8000/api/v1/users/logOut',
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`, // Added space after Bearer
          },
        }
      );

      Cookies.remove('accessToken');
      setIsAuthenticated(false);
      console.log('Logout response:', response);

      if (response.status === 200) {
        console.log('User logged out successfully');
        toast.success('User logged out successfully');
        window.location.replace('/');
      } else {
        console.error('Logout failed:', response.data);
        toast.error('Logout failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Error during logout: ' + error.message);
    }
  };

  return (
    <div className='w-full h-25 flex flex-row justify-around items-center'>
      <Link href='/'>
        <div className='logo flex flex-row justify-evenly gap-2 items-center overflow-hidden my-5'>
          <Image src='/img/logo.png' width={50} height={50} alt='Pravah Logo' />
          <span className='text-3xl font-bold leading-none'>MYOKO</span>
        </div>
      </Link>
      <div className='md:flex hidden flex-row justify-evenly items-center text-2xl w-1/2'>
        <Link href='/'>
          <span className='hover:scale-105 font-bold'>Home</span>
        </Link>
        <Link href='/public/artisans'>
          <span className='hover:scale-105'>Artisans</span>
        </Link>
        <Link href='/public/products'>
          <span className='hover:scale-105'>Categories</span>
        </Link>
        {isAuthenticated ? (
          <>
            <Link href='/user/account?section=orders'>
              <span className='hover:scale-105'>Orders</span>
            </Link>
            <span className='hover:scale-105'>Cart</span>
          </>
        ) : (
          <>
            <Link href='/register'>
              <span className='hover:scale-105'>Register</span>
            </Link>
            <Link href='/login'>
              <span className='hover:scale-105'>Login</span>
            </Link>
          </>
        )}
      </div>
      <DropdownMenu className='w-1/5'>
        <DropdownMenuTrigger className='w-16 h-16 rounded-full'>
          <Avatar className='w-16 h-16 rounded-full'>
            <AvatarImage
              src='https://github.com/shadcn.png'
              alt='User Avatar'
            />
            <AvatarFallback>UA</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[30vh]'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href='/artisans'>
            <DropdownMenuItem>Artisans</DropdownMenuItem>
          </Link>
          {isAuthenticated ? (
            <>
              <Link href='/profile'>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <Link href='/orders'>
                <DropdownMenuItem>Orders</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </>
          ) : (
            <>
              <Link href='/register'>
                <DropdownMenuItem>Register</DropdownMenuItem>
              </Link>
              <Link href='/login'>
                <DropdownMenuItem>Login</DropdownMenuItem>
              </Link>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
