'use client';
import { AuthInput } from '../AuthInput';
import { AuthSubmit } from '../AuthSubmit';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  return (
    <>
      <h1 className="mb-6 text-xl font-bold">Create your account</h1>
      <form className="[&>*]:mb-4 [&_label]:text-sm">
        <div className="flex [&>*]:grow">
          <label className="mr-4">
            First Name
            <AuthInput
              type="text"
              placeholder="Enter your first name"
              onChange={(value: string) => console.log(value)}
            />
          </label>
          <label>
            Last Name
            <AuthInput
              type="text"
              placeholder="Enter your last name"
              onChange={(value: string) => console.log(value)}
            />
          </label>
        </div>
        <div>
          <label>
            Email
            <AuthInput
              type="email"
              placeholder="Enter your email"
              onChange={(value: string) => console.log(value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <AuthInput
              type="password"
              placeholder="Enter your password"
              onChange={(value: string) => console.log(value)}
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
              className="ml-1 text-black underline"
              onClick={() => router.push('/login')}
            >
              Log In
            </span>
          </p>
        </nav>
      </form>
    </>
  );
}
