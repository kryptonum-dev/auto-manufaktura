import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { REGEX } from '@/global/constants';

const validMimeTypes = [
  'image/jpeg',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
];

type RequestTypes = {
  email: string;
  legal: boolean;
  workshop: string;
  job: string;
  files: { name: string; size: number; type: string; bufferBase64: string }[];
  message?: string;
  phone?: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const req = (await request.json()) as RequestTypes;
  const { email, legal, workshop: targetEmail, job, files, message, phone } = req;

  const filesSize = files.reduce((sum, file) => sum + file.size, 0);
  const isValidFiles = files.every(({ type, bufferBase64 }) => validMimeTypes.includes(type) && bufferBase64);

  const isValid =
    REGEX.email.test(email) &&
    targetEmail &&
    legal &&
    job &&
    files.length > 0 &&
    filesSize <= 15 * 1024 * 1024 &&
    isValidFiles &&
    (!phone || REGEX.phone.test(phone));

  if (!isValid) return NextResponse.json({ success: false }, { status: 422 });

  const bodyArray = [`<p>Adres e-mail: <b>${email}</b></p>`, `<p>Stanowisko: <b>${job}</b></p>`];
  if (phone) bodyArray.push(`<p>Numer telefonu: <b>${phone}</b></p>`);
  if (message) bodyArray.push(`<p>Wiadomość: <b>${message}</b></p>`);
  bodyArray.push('<br />');
  bodyArray.push('<p><em>Wyrażono zgodę na politykę prywatności</em></p>');

  const body = bodyArray.join('');
  const text = body.replace(/<[^>]*>/g, '');

  const attachments = files.map(({ bufferBase64, name }) => ({
    filename: name,
    content: bufferBase64,
  }));

  try {
    await resend.emails.send({
      from: `Acme <onboarding@resend.dev>`,
      to: 'admin@auto-manufaktura.pl', //targetEmail
      subject: `Rekrutacja - aplikacja na ofertę pracy: ${job}`,
      replyTo: email,
      html: body,
      text,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 422 });
  }
}
