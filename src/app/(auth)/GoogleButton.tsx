import { LoadingSpinner } from '@/components';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

export function GoogleButton({ variant }: { variant: 'login' | 'signup' }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await signIn('google');
    setLoading(false);
  };

  return (
    <button className="w-full" onClick={handleSubmit}>
      <div className="flex items-center justify-center rounded-md border-[1px] border-gray-400 px-2 py-1.5">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Image
              src="/google.svg"
              alt="Google logo"
              width={20}
              height={20}
              className="mr-3"
            />
            <p>Sign {variant === 'login' ? 'in' : 'up'} with Google</p>
          </>
        )}
      </div>
    </button>
  );
}
