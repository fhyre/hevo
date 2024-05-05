'use client';
import { FormEvent } from 'react';
import { AuthInput } from '../AuthInput';
import { AuthSubmit } from '../AuthSubmit';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('login');
  };

  return (
    <>
      <h1 className="mb-6 text-xl font-bold">Welcome back!</h1>
      <form className="[&>*]:mb-4 [&_label]:text-sm" onSubmit={handleSubmit}>
        <div>
          <label>
            <span className="text-sm">Email</span>
            <AuthInput
              type="email"
              placeholder="Enter your email"
              onChange={(value: string) => console.log(value)}
            />
          </label>
        </div>
        <div>
          <label>
            <span className="text-sm">Password</span>
            <AuthInput
              type="password"
              placeholder="Enter your password"
              onChange={(value: string) => console.log(value)}
            />
          </label>
        </div>
        <div>
          <AuthSubmit text="Login" />
        </div>
        <nav className="text-sm">
          <p className="text-neutral-400">
            Don't have an account?
            <span
              className="ml-1 text-black underline"
              onClick={() => router.push('/register')}
            >
              Sign Up
            </span>
          </p>
        </nav>
      </form>
    </>
  );
}
