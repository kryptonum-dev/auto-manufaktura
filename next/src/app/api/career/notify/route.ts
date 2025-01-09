import { NextResponse } from 'next/server';
import { REGEX } from '@/global/constants';

type RequestTypes = {
  email: string;
  legal: boolean;
  groupId: string;
};

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;

export async function POST(request: Request) {
  const req = (await request.json()) as RequestTypes;
  const { email, legal, groupId } = req;

  if (!REGEX.email.test(email) || !legal || !groupId) return NextResponse.json({ success: false }, { status: 422 });

  try {
    const data = {
      email,
      groups: [groupId],
    };

    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error();

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 422 });
  }
}
