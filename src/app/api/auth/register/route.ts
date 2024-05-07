import Joi from 'joi';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { createUser, findUser } from '@/lib';
import { AuthStatus } from '@/utils';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password } = await request.json();

    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const validation = schema.validate({
      firstName,
      lastName,
      email,
      password,
    });

    if (validation.error) {
      throw new Error(AuthStatus.INVALID_CREDENTIALS);
    }

    const user = await findUser(email);
    if (user) throw new Error(AuthStatus.EMAIL_EXISTS);

    const hashedPassword = await hash(password, 10);

    await createUser(`${firstName} ${lastName}`, email, hashedPassword);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
  }

  return NextResponse.json({
    status: 200,
  });
}
