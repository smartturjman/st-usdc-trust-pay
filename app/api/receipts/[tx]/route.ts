import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: { params: { tx: string } }) {
  const { tx } = params;
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Verified Transaction Certificate</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .title { font-weight: 700; font-size: 20px; }
        .box { border: 1px solid #ccc; padding: 20px; border-radius: 12px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="title">Smart Turjman — Verified Transaction Certificate</div>
      <p><b>Tx Hash:</b> ${tx}</p>
      <div class="box">
        <p>Service: Legal Translation – MOFA</p>
        <p>Amount: 75.00 USDC</p>
        <p>Status: Verified</p>
        <p>Network: Testnet (Demo)</p>
      </div>
      <p>Verify on-chain: Use a block explorer with the hash above (demo mode).</p>
    </body>
  </html>`;
  
  return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
}
