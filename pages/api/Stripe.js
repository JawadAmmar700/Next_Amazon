// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const stripe = require('stripe')(
  'sk_test_51ICWPNGmEcEmaWVSFdgi4JgqcN3s0YOZRB0QBdvgsGPpfveFdV9VFnK7xdfg6clhE2zV8om1W8pWdA8Cvi2sAXUG00sCUdE9sb'
)

export default async (req, res) => {
  if (req.method === 'POST') {
    const { items, email } = req.body

    const transferedItems = items.map(item => ({
      description: item.description,
      quantity: item.quantity,
      price_data: {
        currency: 'usd',
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          images: [item.image],
        },
      },
    }))

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: transferedItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/Success',
        cancel_url: 'http://localhost:3000/',
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
