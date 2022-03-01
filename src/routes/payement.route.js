const express = require("express");
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res, next) => {
  try {
    res.json({ url: "session.url" });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `http://localhost:3000/confirmation`,
      cancel_url: `http://localhost:3000/cancel`,
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;