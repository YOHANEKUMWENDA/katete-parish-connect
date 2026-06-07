import { useState } from "react";
import { Heart } from "lucide-react";

export function DonationForm() {
  const [amount, setAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const presetAmounts = [500, 1000, 2500, 5000]; // in Kwacha/USD cents

  const handleDonate = async () => {
    const donationAmount = selectedAmount || (amount ? parseFloat(amount) * 100 : null);
    if (!donationAmount || donationAmount < 50) {
      alert("Please enter an amount of at least $0.50");
      return;
    }

    setLoading(true);
    try {
      // Create checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: donationAmount }),
      });

      const session = await response.json();
      if (session.url) {
        window.location.href = session.url;
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-[var(--shadow-soft)] border border-[var(--border)] max-w-md">
      <div className="flex items-center gap-2 mb-6">
        <Heart className="h-6 w-6 text-[var(--gold)]" />
        <h3 className="font-serif text-2xl text-[var(--navy-deep)]">Make a Donation</h3>
      </div>

      <div className="space-y-4 mb-6">
        <p className="text-sm text-[var(--muted-foreground)]">Select or enter an amount:</p>
        <div className="grid grid-cols-2 gap-3">
          {presetAmounts.map((amt) => (
            <button
              key={amt}
              onClick={() => {
                setSelectedAmount(amt);
                setAmount("");
              }}
              className={`rounded-lg py-2 px-3 text-sm font-semibold transition-colors ${
                selectedAmount === amt
                  ? "bg-[var(--gold)] text-[var(--navy-deep)]"
                  : "bg-[var(--cream)] text-[var(--navy-deep)] hover:bg-[var(--gold)]/20"
              }`}
            >
              ${(amt / 100).toFixed(0)}
            </button>
          ))}
        </div>

        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">$</span>
          <input
            type="number"
            step="0.01"
            min="0.50"
            max="9999"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setSelectedAmount(null);
            }}
            placeholder="Custom amount"
            className="w-full rounded-lg pl-7 pr-4 py-2 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
          />
        </div>
      </div>

      <button
        onClick={handleDonate}
        disabled={loading}
        className="w-full rounded-full bg-[var(--navy)] py-3 text-sm font-semibold text-[var(--cream)] hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Donate via Stripe"}
      </button>

      <p className="mt-4 text-xs text-[var(--muted-foreground)] text-center">
        Secure payment powered by Stripe. Your information is never shared.
      </p>
    </div>
  );
}
