// Newsletter sign-up, stored in the JKLF app's (Nazm) Supabase project.
//
// Database side (Nazm): an anonymous-callable function
//   public.newsletter_subscribe(p_email text, p_name text, p_source text)
// that validates the email, saves or re-activates the subscriber with the
// time of consent, and returns { "ok": true } (also for an address that is
// already subscribed, so the form never reveals who is on the list).

import config from "../data/supabase.json" with { type: "json" };

export const NEWSLETTER_SOURCE = "diplomatic.jklf.org";

// Returns { ok: true } or { ok: false, error }
export async function subscribeToNewsletter({ email, name }, options = {}) {
  const { request = fetch, env = {} } = options;
  const url = (env.VITE_SUPABASE_URL || config.url).replace(/\/$/, "");
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY || config.publishableKey;

  try {
    const response = await request(`${url}/rest/v1/rpc/newsletter_subscribe`, {
      method: "POST",
      headers: { apikey: key, "Content-Type": "application/json" },
      body: JSON.stringify({
        p_email: email.trim(),
        p_name: name.trim() || null,
        p_source: NEWSLETTER_SOURCE,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok && data?.ok) {
      return { ok: true };
    }

    return {
      ok: false,
      // The function's own message for invalid input or too many sign-ups
      error:
        (response.ok && typeof data?.error === "string" && data.error) ||
        "You could not be signed up right now. Please try again later.",
    };
  } catch {
    return {
      ok: false,
      error:
        "You could not be signed up. Please check your connection and try again.",
    };
  }
}
