import { LoadingSpinner } from '@/components';
import Image from 'next/image';

type AuthButtonProps = {
  text: string;
  loading: boolean;
};

export function AuthSubmit({ text, loading }: AuthButtonProps) {
  return (
    <button className="w-full" type="submit">
      <div className="relative flex items-center justify-center rounded-md bg-slate-900 p-2 text-white">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <p>{text}</p>
            <Image
              unoptimized
              src="/right-arrow.svg"
              alt="Arrow pointing right"
              width={20}
              height={20}
              className="absolute right-0 mr-2"
            />
          </>
        )}
      </div>
    </button>
  );
}
