'use client';
import { useForm } from '@/hooks';
import { AuthInput } from '../AuthInput';
import { AuthSubmit } from '../AuthSubmit';
import { useRouter } from 'next/navigation';
import { Route } from '@/utils';
import { BaseAuthFormData } from '../auth-types';

type RegisterData = BaseAuthFormData & {
  firstName: string;
  lastName: string;
};

export default function Page() {
  const router = useRouter();
  const { errorData, handleChange, handleSubmit } = useForm<RegisterData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  return (
    <>
      <h1 className="mb-6 text-xl font-bold">Create your account</h1>
      <form className="[&>*]:mb-4 [&_label]:text-sm" onSubmit={handleSubmit}>
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
          <AuthSubmit text="Sign Up" />
        </div>
        <nav className="text-sm">
          <p className="text-neutral-400">
            Already have an account?
            <span
              className="ml-1 cursor-pointer text-black underline"
              onClick={() => router.push(Route.LOGIN)}
            >
              Log In
            </span>
          </p>
        </nav>
      </form>
    </>
  );
}
