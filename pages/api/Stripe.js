// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const stripe = require("stripe")(process.env.STRIPE_ID)

export default async (req, res) => {
  if (req.method === "POST") {
    const { items, email } = req.body

    const transferedItems = items.map(item => ({
      description: item.description,
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          images: [item.image],
        },
      },
    }))

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: transferedItems,
        mode: "payment",
        success_url: `${process.env.HOST}/Success`,
        cancel_url: process.env.HOST,
        metadata: {
          email,
          images: JSON.stringify(items.map(item => item.image)),
        },
      })
      res.json({ id: session.id })
    } catch (err) {
      console.log(err)
    }
  }
}
