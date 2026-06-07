import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function createCheckoutSession(amount: number) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.VITE_BASE_URL}/give?success=true`,
    cancel_url: `${process.env.VITE_BASE_URL}/give?canceled=true`,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Donation to St. Thereza Catholic Church",
            description: "Support our parish mission, outreach, and ministry",
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
  });

  return session;
}
