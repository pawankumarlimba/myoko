'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const registered = searchParams.get('registered');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        process.env.DOMAIN + '/api/auth/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (!data.success) {
        toast.error(data.message || 'Invalid email or password');
        setIsLoading(false);
        return;
      }

      toast.success('Sign in successful!');
      router.push(callbackUrl);
    } catch (error) {
      console.error('Sign in error:', error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Something went wrong. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center px-4 py-12'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold'>Sign in</CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {registered && (
            <div className='mb-4 text-green-600'>
              Account created successfully! Please sign in.
            </div>
          )}
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='name@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='password'>Password</Label>
                <Link
                  href='/auth/forgot-password'
                  className='text-sm text-primary hover:underline'
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type='submit'
              className='w-full text-black border-2 backsec'
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <div className='text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link href='/auth/signup' className='text-black'>
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
      <ToastContainer />
    </div>
  );
}
