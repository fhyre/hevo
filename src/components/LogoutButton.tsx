'use client';

import { signOut } from 'next-auth/react';

export function LogoutButton() {
  return (
    <button
      className="rounded-md bg-slate-900 px-3 py-2 text-sm text-white shadow-md"
      onClick={() => signOut()}
    >
      Logout
    </button>
  );
}
