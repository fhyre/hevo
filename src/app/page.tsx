import { LogoutButton } from '@/components';
import { RoutePath } from '@/utils';
import { getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerSession();

  if (!session) {
    redirect(RoutePath.LOGIN);
  }

  const { user } = session;

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <section className="flex flex-col items-center rounded-md bg-white px-5 pb-5 shadow-lg [&>*]:mt-5">
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        <h1 className="text-xl font-bold">{user?.name}</h1>
        <h2 className="text-sm text-gray-500">{user?.email}</h2>
        <LogoutButton />
      </section>
    </main>
  );
}
