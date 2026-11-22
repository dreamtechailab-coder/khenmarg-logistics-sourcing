# Khenmarg Logistics + Shashva — corporate website

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4, exported as a fully static site.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site is written to ./out
```

## Deploy (Nginx on a VPS)

1. `npm run build`
2. Copy the `out/` folder to the server, e.g. `/var/www/khenmarg`
3. Nginx server block:

```nginx
server {
    server_name khenmarg.com www.khenmarg.com;
    root /var/www/khenmarg;
    index index.html;
    location / { try_files $uri $uri/ $uri.html =404; }
    error_page 404 /404.html;
    location ~* \.(jpg|png|svg|css|js|woff2?)$ { expires 30d; add_header Cache-Control "public"; }
}
```

4. `sudo certbot --nginx -d khenmarg.com -d www.khenmarg.com` for HTTPS.

Also works as-is on Vercel, Netlify or Cloudflare Pages.

## Enquiry form

Each enquiry is sent two ways from the browser:

1. **Email** via [FormSubmit](https://formsubmit.co) (`https://formsubmit.co/ajax/naresh@khenmarg.com`), with subject
   "New Contact Enquiry - Khenmarg Logistics", table template, and Reply-To set to the visitor's email.
   Without JavaScript the form falls back to a plain POST to `https://formsubmit.co/naresh@khenmarg.com`.
2. **Database**: a row in the Supabase table `contact_submissions` (insert-only for the public; `email_notified`
   records whether the FormSubmit email went out).

The values below are already the defaults in `components/EnquiryForm.tsx`, so no environment variables are
needed (locally or on Vercel). Set them only to override, e.g. in `.env.local`. They are public and browser-safe:

```
NEXT_PUBLIC_FORMSUBMIT_EMAIL=naresh@khenmarg.com
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Never put the Supabase `service_role` key in this file.

**FormSubmit activation (one time):** submit the form once from the live site. FormSubmit emails
naresh@khenmarg.com an "Activate Form" link; click it. Emails are only delivered after activation. The
activation email also shows a random alias string you can use in place of the address in
`NEXT_PUBLIC_FORMSUBMIT_EMAIL` to keep the address out of the page source.

Pre-fill links: `/contact/?service=sea-freight#enquiry`, `/contact/?product=coconut-milk#enquiry`, `/contact/?type=shashva#enquiry`.

## Editing content

| What | File |
|---|---|
| Address, phones, emails, WhatsApp, menu | `content/site.ts` |
| Services, value-added services, highlights, industries, core values | `content/services.ts` |
| Shashva products and their spec tables | `content/products.ts` |
| Preferred carriers / airlines (hidden until filled) | `app/industries-network/page.tsx` |
| Certifications (hidden until filled) | `app/shashva/quality-export-process/page.tsx` |
| Final domain (used in SEO tags & sitemap) | `content/site.ts` → `url` |

Images live in `public/images`, logos in `public/logos`.

## Content still needed from the client

- [ ] **Final domain name** (currently `https://www.khenmarg.com` in `content/site.ts`)
- [ ] **High-resolution photos** — current hero/section images are taken from the company profile PDF and are low resolution (≈1000px). Also confirm they own the rights to these images.
- [ ] **Product photos** for all 9 Shashva products (illustrations are used for now — see `components/ProductArt.tsx`)
- [ ] **Product specs**: packaging options, MOQ, shelf life, grades/varieties, HS codes
- [ ] **Certifications / registrations** (IEC, APEDA, FSSAI, Spices Board, ISO, Halal…) — the section stays hidden until added
- [ ] **Preferred carriers & airlines** names/logos
- [ ] **Customs broker licence** details, if they want them shown
- [ ] **Team** — photos and names beyond L. Naresh (Head – Sales)
- [ ] **Export markets** — confirm Gulf countries listed (UAE, Saudi Arabia, Qatar, Oman, Kuwait, Bahrain)
- [ ] **Vector logos** (SVG/AI) for Khenmarg and Shashva — current logos were extracted from the business card and trademark scan
- [ ] **Form endpoint** / where leads should go
- [ ] Note: brief mentioned "milk/dairy" exports, but the product list is coconut and plant-based — confirm whether any dairy products should be added
