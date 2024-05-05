'use client';
import { AuthInput } from '../AuthInput';
import { AuthSubmit } from '../AuthSubmit';
import { useRouter } from 'next/navigation';
import { BaseAuthFormData } from '../auth-types';
import { useForm } from '@/hooks';
import { Route } from '@/utils';

export default function Page() {
  const router = useRouter();
  const { errorData, handleChange, handleSubmit } = useForm<BaseAuthFormData>({
    email: '',
    password: '',
  });

  return (
    <>
      <h1 className="mb-6 text-xl font-bold">Welcome back!</h1>
      <form className="[&>*]:mb-4 [&_label]:text-sm" onSubmit={handleSubmit}>
        <div>
          <label>
            <span className="text-sm">Email</span>
            <AuthInput
              type="email"
              name="email"
              placeholder="Enter your email"
              error={errorData.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            <span className="text-sm">Password</span>
            <AuthInput
              type="password"
              name="password"
              placeholder="Enter your password"
              error={errorData.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <AuthSubmit text="Login" />
        </div>
        <nav className="text-sm">
          <p className="text-neutral-400">
            Don&apos;t have an account?
            <span
              className="ml-1 cursor-pointer text-black underline"
              onClick={() => router.push(Route.SIGNUP)}
            >
              Sign Up
            </span>
          </p>
        </nav>
      </form>
    </>
  );
}
