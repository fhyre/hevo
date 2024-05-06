import { SignOutButton } from '@/components';
import { RoutePath } from '@/utils';
import { getServerSession } from 'next-auth';
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
      <section className="flex min-w-[300px] flex-col items-center rounded-md bg-white px-5 pb-5 shadow-lg [&>*]:mt-5">
        <div className="overflow-hidden rounded-full">
          <Image
            src={user?.image ? user?.image! : '/default.svg'}
            alt="Profile picture"
            width={72}
            height={16}
          />
        </div>
        <h1 className="text-3xl font-bold">{user?.name}</h1>
        <h2 className="text-lg text-gray-500">{user?.email}</h2>
        <SignOutButton />
      </section>
    </main>
  );
}
