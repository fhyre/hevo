import { findUser } from '@/lib';
import { RoutePath } from '@/utils';
import { compare } from 'bcrypt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: RoutePath.LOGIN,
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
        if (!user || !(await compare(credentials?.password!, user.password)))
          return null;

        return {
          id: user.id,
          name: user.name,
          created_at: user.created_at,
        };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
