import { NextResponse } from 'next/server';

// Payload API disabled during project reset. Return a clear message instead of
// attempting to initialize Payload which has been removed.
export async function GET() {
  return NextResponse.json({ status: 'payload-disabled' });
}
