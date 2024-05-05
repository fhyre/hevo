import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
  } catch (e) {
    console.log(e);
  }

  return NextResponse.json({ ok: true, message: 'Register successful' });
}
