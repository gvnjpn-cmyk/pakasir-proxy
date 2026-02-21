export default async function handler(req, res) {
  const { order_id } = req.query;

  try {
    const response = await fetch(
      "https://app.pakasir.com/api/transactiondetail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0"
        },
        body: JSON.stringify({
          project: process.env.PAKASIR_SLUG,
          order_id: order_id,
          api_key: process.env.PAKASIR_API_KEY
        })
      }
    );

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: "Proxy error" });
  }
}
