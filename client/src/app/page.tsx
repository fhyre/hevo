import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <section className="[&>*]:mt-5">
        <Image src="/profile.svg" alt="Vercel Logo" width={72} height={16} />
        <h1 className="text-sm text-gray-500">Name</h1>
        <p></p>
        <h2 className="text-sm text-gray-500">Email</h2>
        <p></p>
      </section>
    </main>
  );
}
