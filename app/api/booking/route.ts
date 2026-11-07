import { NextResponse } from 'next/server';

// TODO: deliver the request to reception (email, CRM or database). For now it is validated and acknowledged only.
export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b || typeof b.first !== 'string' || typeof b.phone !== 'string' || !b.clinic || !b.notEmerg) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  const ref = 'RZ-' + Math.floor(10000 + Math.random() * 89999);
  console.log('[booking]', ref, b.clinic, b.day, b.slot);
  return NextResponse.json({ ref });
}
