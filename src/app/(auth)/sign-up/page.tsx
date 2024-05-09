'use client';
import { useForm } from '@/hooks';
import { AuthInput } from '../auth-input';
import { AuthSubmit } from '../auth-submit';
import { useRouter } from 'next/navigation';
import { AuthStatus, RoutePath } from '@/utils';
import { BaseAuthFormData } from '../auth-types';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { GoogleButton } from '../google-button';

type RegisterData = BaseAuthFormData & {
  firstName: string;
  lastName: string;
  confirmPassword: string;
};

export default function Page() {
  const router = useRouter();
  const { formData, errorData, handleChange, validateData } =
    useForm<RegisterData>({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    if (!validateData()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const resJson = await response.json();

      if (resJson.error) {
        throw new Error(resJson.error);
      }

      toast.success(AuthStatus.SIGNUP_SUCCESS);

      await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      router.push(RoutePath.HOME);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <h1 className="mb-6 text-xl font-bold">Create your account</h1>
      <form className="[&>*]:mb-3 [&_label]:text-sm" onSubmit={handleSubmit}>
        <div className="flex [&>*]:grow">
          <label className="mr-4">
            First Name
            <AuthInput
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              error={errorData.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name
            <AuthInput
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              error={errorData.lastName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email
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
            Password
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
          <label>
            Confirm password
            <AuthInput
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              error={errorData.confirmPassword}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <AuthSubmit text="Sign Up" loading={loading} />
        </div>
      </form>
      <div className="-mt-2 mb-2">
        <GoogleButton variant="signup" />
      </div>
      <nav className="text-sm">
        <p className="text-neutral-400">
          Already have an account?
          <span
            className="ml-1 cursor-pointer text-black underline"
            onClick={() => router.push(RoutePath.LOGIN)}
          >
            Log In
          </span>
        </p>
      </nav>
    </>
  );
}
