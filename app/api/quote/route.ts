import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    partnerId: "translator-023",
    priceUSDC: "75.00",
    trustScore: 84,
  });
}
