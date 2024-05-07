'use client';

import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export function SignOutButton() {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  return (
    <button
      className="relative flex w-[150px] items-center justify-center rounded-md bg-slate-900 px-3 py-2 text-sm text-white shadow-md"
      onClick={handleSignOut}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <span>Sign Out</span>
          <Image
            src="/signout.svg"
            alt="Exit icon"
            width={18}
            height={18}
            className="absolute right-0 mr-2"
          />
        </>
      )}
    </button>
  );
}
