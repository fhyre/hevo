import { RoutePath } from '@/utils';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (session) {
    redirect(RoutePath.HOME);
  }

  return (
    <div className="from-inidigo-500 min-w-screen flex min-h-screen flex-col items-center justify-center bg-gradient-to-tr from-indigo-400 from-25% via-sky-300 via-50% to-emerald-500 to-90%">
      <section className="my-3 w-[50%] min-w-[350px] max-w-[600px] rounded-xl bg-white p-6 shadow-2xl">
        <div className="-ml-3 -mt-4 flex items-center">
          <Image
            unoptimized
            src="/logo.svg"
            alt="Hevo Logo"
            width={50}
            height={50}
          />
          <h1 className="font-bold">Hevo.</h1>
        </div>
        <hr className="-mt-2 mb-4 h-[1px] border-t-0 bg-neutral-300" />
        {children}
      </section>
    </div>
  );
}
