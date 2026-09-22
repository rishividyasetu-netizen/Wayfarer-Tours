import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    data: [
      { id: "europe-trip", title: "Europe Trip", type: "OUTBOUND", destination: "Europe", duration: 10, price: 210000, currency: "INR" },
      { id: "north-east-india-trip", title: "North East India Trip", type: "DOMESTIC", destination: "Sikkim, India", duration: 8, price: 64900, currency: "INR" },
      { id: "north-america-trip", title: "North America Trip", type: "OUTBOUND", destination: "New York, USA", duration: 8, price: 185000, currency: "INR" },
    ],
  });
}
