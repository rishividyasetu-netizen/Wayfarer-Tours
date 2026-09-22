import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/INR", { next: { revalidate: 3600 } });
    if (!response.ok) return NextResponse.json({ rates: { INR: 1 } });
    const data = await response.json();
    return NextResponse.json({ rates: data.rates || { INR: 1 } }, { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
  } catch {
    return NextResponse.json({ rates: { INR: 1 }, fallback: true });
  }
}
