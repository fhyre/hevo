'use client';

import { signOut } from 'next-auth/react';
import Image from 'next/image';

export function SignOutButton() {
  return (
    <button
      className="relative flex w-[150px] items-center justify-center rounded-md bg-slate-900 px-3 py-2 text-sm text-white shadow-md"
      onClick={() => signOut()}
    >
      <span>Sign Out</span>
      <Image
        src="/signout.svg"
        alt="Exit icon"
        width={18}
        height={18}
        className="absolute right-0 mr-2"
      />
    </button>
  );
}
