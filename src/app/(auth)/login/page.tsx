'use client';
import { AuthInput } from '../AuthInput';
import { AuthSubmit } from '../AuthSubmit';
import { useRouter } from 'next/navigation';
import { BaseAuthFormData } from '../auth-types';
import { useForm } from '@/hooks';
import { AuthStatus, RoutePath } from '@/utils';
import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { GoogleButton } from '../GoogleButton';

export default function Page() {
  const router = useRouter();
  const { formData, errorData, handleChange, validateData } =
    useForm<BaseAuthFormData>({
      email: '',
      password: '',
    });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    if (!validateData()) return;

    setLoading(true);

    try {
      const response = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (!response?.error) {
        toast.success(AuthStatus.LOGIN_SUCCESS);
        router.push(RoutePath.HOME);
        return;
      }

      throw new Error(AuthStatus.EMAIL_PASSWORD_INCORRECT);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }

    setLoading(false);
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
        <AuthSubmit text="Login" loading={loading} />
      </form>
      <div className="-mt-2 mb-2">
        <GoogleButton variant="login" />
      </div>
      <nav className="text-sm">
        <p className="text-neutral-400">
          Don&apos;t have an account?
          <span
            className="ml-1 cursor-pointer text-black underline"
            onClick={() => router.push(RoutePath.SIGNUP)}
          >
            Sign Up
          </span>
        </p>
      </nav>
    </>
  );
}
