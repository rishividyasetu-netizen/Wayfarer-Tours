import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwardedFor || request.headers.get("x-real-ip");
  if (!ip || ip === "::1" || ip === "127.0.0.1") return NextResponse.json({ country: null });

  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`, { next: { revalidate: 86400 } });
    if (!response.ok) return NextResponse.json({ country: null });
    const data = await response.json();
    return NextResponse.json({ country: data.country_code || null });
  } catch {
    return NextResponse.json({ country: null });
  }
}
