export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { amount } = req.body;

  try {
    const response = await fetch(
      "https://app.pakasir.com/api/transactioncreate/qris",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0"
        },
        body: JSON.stringify({
          project: process.env.PAKASIR_SLUG,
          order_id: "INV-" + Date.now(),
          amount: amount,
          api_key: process.env.PAKASIR_API_KEY
        })
      }
    );

    const text = await response.text();
    return res.status(response.status).send(text);

  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
}
