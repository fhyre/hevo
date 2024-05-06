import { signIn } from 'next-auth/react';
import Image from 'next/image';

export function GoogleButton({ variant }: { variant: 'login' | 'signup' }) {
  return (
    <button className="w-full" onClick={() => signIn('google')}>
      <div className="flex items-center justify-center rounded-md border-[1px] border-gray-400 px-2 py-1.5">
        <Image
          src="/google.svg"
          alt="Google logo"
          width={20}
          height={20}
          className="mr-3"
        />
        <p>Sign {variant === 'login' ? 'in' : 'up'} with Google</p>
      </div>
    </button>
  );
}
