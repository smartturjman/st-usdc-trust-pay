import { NextRequest, NextResponse } from "next/server";

let trustScore = 84;

export async function GET(req: NextRequest) {
  const tx = req.nextUrl.searchParams.get("tx");
  if (!tx) {
    return NextResponse.json({ error: "Missing tx" }, { status: 400 });
  }

  // Simulate verification and trust score update
  trustScore += 1;
  const receiptUrl = `/api/receipts/${tx}`;

  return NextResponse.json({
    status: "verified",
    trustScoreNew: trustScore,
    receiptUrl,
  });
}
