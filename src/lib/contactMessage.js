// Sends the contact form to the "contact-message" Edge Function in the JKLF app's
// (Nazm) Supabase project. It saves the message and emails it to the organisation.
// The Diplomatic Bureau site uses the same function; messages are marked with
// the site they came from (see ContactForm).

import config from "../data/supabase.json" with { type: "json" };

function supabaseConfig(env = {}) {
  return {
    url: (env.VITE_SUPABASE_URL || config.url).replace(/\/$/, ""),
    key: env.VITE_SUPABASE_PUBLISHABLE_KEY || config.publishableKey,
  };
}

// Values must be ones the Edge Function accepts (same list as jklf.org).
export const CONTACT_SUBJECTS = [
  { value: "international", label: "Government / Diplomatic" },
  { value: "research", label: "UN, NGO or Human Rights" },
  { value: "media", label: "Media / Press" },
  { value: "general", label: "Diaspora / General" },
];

// Returns { ok: true } or { ok: false, error, rateLimited }
export async function sendContactMessage(fields, options = {}) {
  const { request = fetch, env } = options;
  const { url, key } = supabaseConfig(env);

  try {
    const response = await request(`${url}/functions/v1/contact-message`, {
      method: "POST",
      headers: { apikey: key, "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok && data.ok) {
      return { ok: true };
    }

    return {
      ok: false,
      rateLimited: response.status === 429,
      error:
        data.error ||
        "Your message could not be sent. Please try again later.",
    };
  } catch {
    return {
      ok: false,
      error:
        "Your message could not be sent. Please check your connection and try again.",
    };
  }
}
