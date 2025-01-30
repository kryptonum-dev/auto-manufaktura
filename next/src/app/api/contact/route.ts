import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { REGEX } from '@/global/constants';

type RequestTypes = {
  email: string;
  legal: boolean;
  workshop: string;
  department?: string;
  phone?: string;
  topic?: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const req = (await request.json()) as RequestTypes;
  const { email, legal, workshop, topic, department = '', phone = '' } = req;

  const targetEmail = department || workshop;
  const isValid = REGEX.email.test(email) && targetEmail && topic && legal && (!phone || REGEX.phone.test(phone));
  if (!isValid) return NextResponse.json({ success: false }, { status: 422 });

  const bodyArray = [`<p>Adres e-mail: <b>${email}</b></p>`];
  if (phone) bodyArray.push(`<p>Numer telefonu: <b>${phone}</b></p>`);
  bodyArray.push(`<p>Temat wiadomości: <b>${topic.trim().replace(/\n/g, '<br />')}</b></p>`);
  bodyArray.push('<br />');
  bodyArray.push('<p><em>Wyrażono zgodę na politykę prywatności</em></p>');

  const body = bodyArray.join('');
  const text = body.replace(/<[^>]*>/g, '');

  try {
    await resend.emails.send({
      from: `Formularz kontaktowy - AutoManufaktura <formularz@send.auto-manufaktura.pl>`,
      to: targetEmail,
      subject: `Wiadomość z formularza kontaktowego - AutoManufaktura`,
      replyTo: email,
      html: body,
      text,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 422 });
  }
}
