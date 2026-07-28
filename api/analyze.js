/**
 * Vercel Serverless Function — vision proxy.
 * GEMINI_API_KEY only in Vercel Project → Settings → Environment Variables.
 *
 * POST /api/analyze
 * Body: { image_b64, prompt, model? }
 * Response: { text } | { error }
 */

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

module.exports = async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: "Server misconfigured: set GEMINI_API_KEY in Vercel env",
    });
    return;
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const imageB64 = body.image_b64;
  const prompt = body.prompt || "Describe this game screenshot.";
  const model = body.model || process.env.GEMINI_MODEL || "gemini-flash-latest";

  if (!imageB64 || typeof imageB64 !== "string") {
    res.status(400).json({ error: "image_b64 required" });
    return;
  }
  if (imageB64.length > 5_500_000) {
    res.status(413).json({ error: "Image too large" });
    return;
  }

  const url = `${GEMINI_BASE}/models/${model}:generateContent?key=${apiKey}`;
  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          { inline_data: { mime_type: "image/png", data: imageB64 } },
          { text: prompt },
        ],
      },
    ],
  };

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await resp.json();
    if (!resp.ok) {
      res.status(502).json({
        error: data?.error?.message || `Gemini HTTP ${resp.status}`,
      });
      return;
    }
    const texts = [];
    for (const cand of data.candidates || []) {
      for (const part of (cand.content && cand.content.parts) || []) {
        if (part.text) texts.push(part.text);
      }
    }
    if (!texts.length) {
      res.status(502).json({ error: "Empty model response" });
      return;
    }
    res.status(200).json({ text: texts.join("\n") });
  } catch (err) {
    res.status(500).json({ error: String(err && err.message ? err.message : err) });
  }
};
