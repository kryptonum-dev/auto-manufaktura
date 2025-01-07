import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { REGEX } from '@/global/constants';

type RequestTypes = {
  email: string;
  question: string;
  legal: boolean;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const req = (await request.json()) as RequestTypes;
  const { email, question, legal } = req;

  if (!REGEX.email.test(email) || !question || !legal) return NextResponse.json({ success: false }, { status: 422 });

  const body = [
    `<p>Adres e-mail: <b>${email}</b></p>`,
    `<p>Pytanie: <b>${question.trim()}</b></p>`,
    '<br />',
    '<p><em>Wyrażono zgodę na politykę prywatności</em></p>',
  ].join('');
  const text = body.replace(/<[^>]*>/g, '');

  try {
    await resend.emails.send({
      from: `Acme <onboarding@resend.dev>`,
      to: 'admin@auto-manufaktura.pl', // change this to the target email address
      subject: `Wiadomość przesłana przez formularz FAQ`,
      replyTo: email,
      html: body,
      text,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 422 });
  }
}
