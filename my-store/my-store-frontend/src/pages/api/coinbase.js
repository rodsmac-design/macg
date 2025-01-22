const CoinbaseCommerce = require('@coinbase-commerce/node');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const apiKey = process.env.COINBASE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'Coinbase API key is not configured.' });
    }

    try {
      const client = CoinbaseCommerce.Client.init(apiKey);

      const chargeData = {
        name: req.body.name || 'Order Payment',
        description: req.body.description || 'Payment for your order',
        local_price: {
          amount: req.body.amount,
          currency: req.body.currency || 'USD',
        },
        pricing_type: 'fixed_price',
        metadata: {
          order_id: req.body.orderId,
        },
        redirect_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancel`,
      };

      const charge = await client.charge.create(chargeData);

      res.status(200).json({ hosted_url: charge.hosted_url });
    } catch (err) {
      console.error('Error creating Coinbase charge:', err);
      res.status(500).json({ error: 'Unable to create charge.' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

