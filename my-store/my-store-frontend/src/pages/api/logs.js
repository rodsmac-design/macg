export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log("Logging data:", req.body); // Logs to terminal
    res.status(200).json({ message: "Logged successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

