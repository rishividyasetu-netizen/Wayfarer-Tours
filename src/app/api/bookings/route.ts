import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const booking = await request.json();
  return NextResponse.json({ data: { ...booking, status: "PENDING", id: crypto.randomUUID() } }, { status: 201 });
}
