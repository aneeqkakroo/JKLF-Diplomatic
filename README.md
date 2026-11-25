# JKLF Diplomatic Bureau website

The website of the Diplomatic Bureau of the Jammu Kashmir Liberation Front, planned for **diplomatic.jklf.org**.
It uses the same stack and look as the main site ([jklf.org](https://www.jklf.org)): React 19, Vite, React Router, lucide-react, plain CSS with the shared tokens in `src/styles/variables.css`.

## Pages

| Path | Content |
| --- | --- |
| `/` | Hero, what the bureau does for each audience, position in brief, latest Bureau statements (hidden while there are none), Head of Bureau |
| `/position` | JKLF's position for an international reader, linking to the full position on jklf.org |
| `/bureau` | Head of Bureau, representatives (hidden while empty), mandate |
| `/statements`, `/statements/:slug` | Diplomatic Bureau statements (from `src/data/statements.js`) |
| `/documents` | Constitution PDF and reference links to jklf.org |
| `/contact` | Contact form (`/contact?as=governments\|organisations\|media\|diaspora` preselects the enquiry type) |

## Editing content

- People, mandate, position points, documents and social links: `src/data/bureau.js`.
  Add representatives to the `representatives` list; the section appears once it has entries. Photos go in `public/images/`.
- Bureau statements: `src/data/statements.js` (the format is explained at the top of the file). JKLF's general press releases are not shown here; they stay on jklf.org/news.

## Connected services

The contact form and newsletter sign-up use the JKLF app's (Nazm) Supabase project, configured in `src/data/supabase.json` (publishable key only):

- **Contact form**: the `contact-message` Edge Function. Messages arrive in the same inbox as jklf.org's contact form, marked "Sent from the Diplomatic Bureau site" and with the sender's organisation at the top.
- **Newsletter sign-up** (home page): the `newsletter_subscribe(p_email, p_name, p_source)` database function. Added in [Nazm PR #5](https://github.com/aneeqkakroo/Nazm/pull/5); until that migration is applied to the Supabase project, the form shows "You could not be signed up right now". The function must be callable anonymously, save the subscriber with the time of consent, and return `{ "ok": true }` (also for addresses already subscribed).

## Run locally

```powershell
npm install
npm run dev
```

`npm run build` builds into `dist/`; `npm run lint` checks the code.

## Deploying to diplomatic.jklf.org

1. Create a GitHub repository (e.g. `aneeqkakroo/JKLF-Diplomatic`) and push this folder to it.
2. In Vercel, **Add New → Project**, import that repository. Vercel detects Vite; defaults (`npm run build`, output `dist`) are correct. `vercel.json` already sends every page route to `index.html`.
3. In the new project's **Settings → Domains**, add `diplomatic.jklf.org`. If jklf.org's DNS is on Vercel this is automatic; otherwise add the CNAME record Vercel shows (`diplomatic` → `cname.vercel-dns.com`) at the DNS provider.
4. **Before the contact form works on the live site**, add `https://diplomatic.jklf.org` to the allowed origins of the `contact-message` Edge Function in the Nazm Supabase project. At the moment it only allows `https://www.jklf.org` (and localhost), so the browser blocks messages from the new domain.
5. Optionally add a link to diplomatic.jklf.org from jklf.org (e.g. the Diplomatic Bureau card on the home and leadership pages).
