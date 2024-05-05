import { RoutePath } from '@/utils';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerSession();

  if (!session) {
    redirect(RoutePath.LOGIN);
  }

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <section className="[&>*]:mt-5">
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        <h1 className="text-sm text-gray-500">Name</h1>
        <p></p>
        <h2 className="text-sm text-gray-500">Email</h2>
        <p></p>
      </section>
    </main>
  );
}
