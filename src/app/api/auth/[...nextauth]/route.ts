import { createUser, findUser } from '@/lib';
import { RoutePath } from '@/utils';
import { compare } from 'bcrypt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: RoutePath.LOGIN,
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        const email = profile?.email;
        const name = profile?.name;

        const user = await findUser(profile?.email!);
        if (user) return true;

        await createUser(name!, email!);
      }
      return true;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const user = await findUser(credentials?.email!);
        if (!user || !(await compare(credentials?.password!, user.password!)))
          return null;

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };
