/**
 * Vision proxy — API key lives only in Netlify env (GEMINI_API_KEY).
 * Client (Viewing.exe) never receives the key.
 *
 * POST JSON: { image_b64, prompt, model? }
 * Response: { text } or { error }
 */

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";

exports.handler = async (event) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: cors, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: cors,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({
        error: "Server misconfigured: GEMINI_API_KEY not set in Netlify env",
      }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({ error: "Invalid JSON" }),
    };
  }

  const imageB64 = body.image_b64;
  const prompt = body.prompt || "Describe this game screenshot.";
  const model = body.model || process.env.GEMINI_MODEL || "gemini-flash-latest";

  if (!imageB64 || typeof imageB64 !== "string") {
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({ error: "image_b64 required" }),
    };
  }

  // Basic size guard (~4MB base64)
  if (imageB64.length > 5_500_000) {
    return {
      statusCode: 413,
      headers: cors,
      body: JSON.stringify({ error: "Image too large" }),
    };
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
      return {
        statusCode: 502,
        headers: cors,
        body: JSON.stringify({
          error: data?.error?.message || `Gemini HTTP ${resp.status}`,
        }),
      };
    }
    const texts = [];
    for (const cand of data.candidates || []) {
      for (const part of (cand.content && cand.content.parts) || []) {
        if (part.text) texts.push(part.text);
      }
    }
    if (!texts.length) {
      return {
        statusCode: 502,
        headers: cors,
        body: JSON.stringify({ error: "Empty model response", raw: data }),
      };
    }
    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({ text: texts.join("\n") }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({ error: String(err && err.message ? err.message : err) }),
    };
  }
};
