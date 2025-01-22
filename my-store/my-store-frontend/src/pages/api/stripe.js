const stripe = require('stripe')('pk_live_51QPtW1INFzZ4I8ipE91BdSM5QBJ4GwJzDQul1owJrQBQVKEqTsjgKKCZElGxRrciYn8egTcdtRsp4AW7r3q5Z0MK00phdxajFk');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body.items,
        mode: 'payment',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancel`,
      });
      res.status(200).json({ id: session.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

