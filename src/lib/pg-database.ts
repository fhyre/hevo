import { createKysely } from '@vercel/postgres-kysely';
import { Generated } from 'kysely';

type Database = {
  users: UsersTable;
};

export type UsersTable = {
  id: Generated<string>;
  name: string;
  email: string;
  password?: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
};

const db = createKysely<Database>();

export async function createUser(
  name: string,
  email: string,
  password?: string,
) {
  await db
    .insertInto('users')
    .values({ name: name, email: email, password: password })
    .executeTakeFirst();
}

export async function findUser(email: string) {
  const user = await db
    .selectFrom('users')
    .selectAll()
    .where('email', '=', email)
    .executeTakeFirst();

  return user;
}

export async function deleteUser(email: string) {
  await db.deleteFrom('users').where('email', '=', email).execute();
}
