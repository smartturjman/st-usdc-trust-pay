import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  // simulate transaction
  const fakeTx = "0x" + Math.random().toString(16).slice(2).padEnd(64, "0");

  return NextResponse.json({
    txHash: fakeTx,
    status: "pending",
    partnerId: body.partnerId,
    amount: body.amountUSDC,
  });
}
