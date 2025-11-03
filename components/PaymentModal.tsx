"use client";
import { useState } from "react";

type Quote = { partnerId: string; priceUSDC: string; trustScore: number };

export default function PaymentModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [verify, setVerify] = useState<any>(null);

  async function getQuote() {
    setLoading(true);
    const r = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId: "legal-translation-mofa",
        docType: "birth-certificate",
      }),
    });
    const q = await r.json();
    setQuote(q);
    setLoading(false);
  }

  async function pay() {
    if (!quote) return;
    setLoading(true);
    const r = await fetch("/api/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        partnerId: quote.partnerId,
        amountUSDC: quote.priceUSDC,
        serviceId: "legal-translation-mofa",
      }),
    });
    const p = await r.json();
    setTxHash(p.txHash);
    setLoading(false);
  }

  async function doVerify() {
    if (!txHash) return;
    setLoading(true);
    const r = await fetch(`/api/verify?tx=${txHash}`);
    const v = await r.json();
    setVerify(v);
    setLoading(false);
  }

  return (
    <>
      <button
        className="px-5 py-3 rounded-2xl bg-indigo-600 text-white shadow"
        onClick={() => {
          setOpen(true);
          getQuote();
        }}
      >
        Pay Legal Translation (USDC)
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 grid place-items-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 space-y-4">
            <div className="text-xl font-semibold">
              Legal Translation – MOFA
            </div>

            {loading && <div>Processing…</div>}

            {quote && (
              <div className="space-y-1 text-sm">
                <div>
                  <b>Partner:</b> {quote.partnerId}
                </div>
                <div>
                  <b>Price:</b> {quote.priceUSDC} USDC (gasless)
                </div>
                <div>
                  <b>Trust Score:</b> {quote.trustScore}/100
                </div>
              </div>
            )}

            {!txHash && (
              <button
                onClick={pay}
                className="w-full py-2 rounded-xl bg-emerald-600 text-white"
                disabled={loading || !quote}
              >
                Confirm USDC Payment
              </button>
            )}

            {txHash && !verify && (
              <>
                <div className="text-sm break-all">
                  <b>Tx Hash:</b> {txHash}
                </div>
                <button
                  onClick={doVerify}
                  className="w-full py-2 rounded-xl bg-indigo-700 text-white"
                  disabled={loading}
                >
                  Verify & Issue Receipt
                </button>
              </>
            )}

            {verify && (
  <div className="space-y-2 text-sm">
    <div className="text-emerald-700 font-semibold">
      Payment Verified ✅
    </div>
    <div>
      <b>New Trust Score:</b> {verify.trustScoreNew}
    </div>
    <a
      className="underline text-indigo-700"
      href={verify.receiptUrl}
      target="_blank"
    >
      Download Verified Transaction Certificate (PDF)
    </a>
  </div>
)}

<button
  className="w-full py-2 rounded-xl bg-gray-100"
  onClick={() => setOpen(false)}
>
  Close
</button>

          </div>
        </div>
      )}
    </>
  );
}
