# Brightseed

A Next.js portfolio and blog with content stored in this repository. No WordPress, GraphQL, CMS credentials, or reCAPTCHA setup is required.

## Run locally

Use Node.js 24 LTS (minimum 22.12).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Development and production builds use Webpack to retain the existing Sass and Tailwind 2 pipeline.

## Write a post

Add a file to `content/posts/`. Its filename becomes the URL: `my-first-post.md` is published at `/posts/my-first-post`. Use lowercase letters, digits, and hyphens in filenames.

```yaml
---
title: My first post
date: "2026-11-09"
excerpt: A short plain-text summary.
author: Brightseed
categories:
  - Engineering
tags:
  - Development
coverImage: /img/slide_bg.png
draft: false
---

## Start writing

Write the body in Markdown.
```

Title, date, and excerpt are required. Author, categories, tags, cover image, and draft status are optional. Cover images must be local PNG, JPEG, WebP, or AVIF files under `public/`. The imported posts demonstrate Markdown formatting; `draft-example.md` demonstrates an unpublished draft. The optional `publishedAt` field preserves the original publication timestamp.

Posts are sorted newest first. `draft: true` excludes a post from both listings and public routes. Unknown slugs return 404. Markdown HTML is sanitized before rendering; scripts, event handlers, and unsafe URL schemes are removed. Metadata is rendered as plain text.

Changes appear during local development; production needs a rebuild and deployment to publish new content.

## Site content

- `content/pages/home.md`: home-page metadata and retained source copy.
- `components/agency-home.js`: the homepage presentation and section copy.
- `styles/agency.scss`: the responsive agency design; `--brand` retains Brightseed blue (`#009EE3`).
- `content/homepage.json`: local slides, services, projects, pricing, and testimonials; `content` and `excerpt` fields use Markdown. Each project has an explicit `category` used by portfolio filters, independent of its title.
- `content/pages/privacy.md` and `terms.md`: local policy pages.
- `lib/site-config.mjs`: public site URL, contact email and SEO settings, re-exported by `lib/site.js`.
- `lib/services.mjs`: service page content.
- `pages/services/` and `pages/portfolio/`: service and project pages.
- `public/`: local images, fonts, and other assets.

Service images use Next.js Image with responsive `sizes`, so browsers receive resized AVIF/WebP variants from `/_next/image`. Keep that route available when deploying behind a proxy. The original uploaded files remain available in `public/`; `imageWidth` and `imageHeight` in `lib/services.mjs` record their intrinsic dimensions. CSS preserves matching image frames without stretching the photos.

The original bright blue `--brand` (`#009ee3`) is used for backgrounds, gradients and decorative accents. Use `--brand-ink` for blue text on light backgrounds and the lighter accent on dark backgrounds. Body text uses the higher-contrast `--muted` colour.

On 9 November 2026, 11 published posts and the existing page content were recovered from the public site's cached Next.js data because the WordPress API returned a database connection error. Their titles, publication dates, authors, categories, tags, and body content were converted to Markdown. Images and homepage videos are stored in `public/media/` (about 93 MiB). The former encoded thin-space article URL redirects permanently to its normalized slug. This imports everything listed on the public blog; unpublished or unlisted CMS content could not be checked.

The policy pages were recovered from the public site. The privacy page also describes contact enquiries through Web3Forms and newsletter signups through MailerLite.

Eight illustrations hosted on third-party sites returned HTTP 403 or 404 during migration. Their captions are retained where available, and their original URLs are recorded in `content/unavailable-media.json`; broken image elements were removed. All remaining article images and homepage media are local.

Contact buttons link to `/contact`, the only page with an enquiry form. When configured, Web3Forms handles that form and MailerLite handles the footer newsletter signup. The contact page also offers a direct email link.

The agency redesign follows the supplied reference at https://agency.demo.nextjstemplates.com/.
Reference imagery and the locally hosted Inter font are documented in `public/design/agency/README.md`.
Brightseed's content and direct email contact option are retained. The existing Framer Motion page transitions
remain in `components/layout.js`; `_app.js` excludes URL hashes from the page key so anchor links do
not restart the page animation. The older slider components and original media are retained in the
repository, but the new homepage uses the reference's static hero and card layouts.

## Contact forms and newsletter signups

Copy `.env.example` to `.env.local` and fill in the two public settings. Neither integration needs a private API token or an additional dependency.

1. **Web3Forms:** create an access key at https://web3forms.com/ for the inbox that should receive enquiries. Set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` to that key. The form on `/contact` sends the visitor's name, email (used as the reply-to address) and message directly from the browser to Web3Forms. It includes a hidden spam trap, required fields, duplicate-submit protection, a 20-second timeout, and an accessible success/error message. Failed submissions retain the visitor's text. A direct email link remains available on the contact page.
2. **MailerLite:** create an **Embedded form** under **Forms**, select your newsletter subscriber group and use an email-only form. Keep **double opt-in** enabled and configure its confirmation email and success page. Under **Overview → Embed form to your website → HTML**, copy only the `<form action="…">` URL into `NEXT_PUBLIC_MAILERLITE_FORM_ACTION`. It must have the shape `https://assets.mailerlite.com/jsonp/ACCOUNT_ID/forms/FORM_ID/subscribe`. The footer uses a styled HTML form that posts to this URL and navigates to MailerLite's response page. MailerLite handles signup validation, confirmation and subscription status; the website never reports a successful signup before MailerLite accepts it. If you add required fields, consent fields or reCAPTCHA in MailerLite, update the local form to match its generated HTML before deploying.

These `NEXT_PUBLIC_` values are intended to be visible in the browser. **Do not put a private MailerLite API token in them.** Both forms stay hidden when their corresponding setting is missing or malformed; existing email contact still works. No MailerLite universal tracking script is loaded.

The contact form uses the official React hCaptcha integration with [Web3Forms' shared free-plan site key](https://docs.web3forms.com/getting-started/customizations/spam-protection/hcaptcha). No extra environment variables or hCaptcha account are needed. **Enable hCaptcha under Block Spam in the Web3Forms form settings before considering protection active.** Web3Forms must enforce verification server-side; browser checks alone cannot stop direct requests. The form sends `h-captcha-response`, blocks missing/expired tokens, resets single-use tokens after every submission attempt, and retains message text after failures. If the widget fails to load, visitors can retry or email directly. Verify a real submission and inbox delivery manually after enabling the dashboard setting; automated browser checks use mocked CAPTCHA and submission responses and do not prove provider-side enforcement.

Restart the development server after changing `.env.local`. Set the same values in your hosting provider's build environment and rebuild/redeploy to activate the forms in production. A source change alone does not configure a provider account or deploy the site.

Before launch, send a real enquiry you control and verify delivery and reply-to in the receiving inbox. Subscribe with an address you control, confirm the double opt-in email, verify its MailerLite group and test unsubscribe. Account delivery and confirmation cannot be verified with placeholder settings.

Provider instructions: [Web3Forms API](https://docs.web3forms.com/getting-started/api-reference), [MailerLite HTML forms](https://www.mailerlite.com/help/how-to-create-an-embedded-form), [MailerLite double opt-in](https://www.mailerlite.com/help/how-to-use-double-opt-in-when-collecting-subscribers).

## Verify and deploy

```sh
npm run lint
npm test
npm audit
npm run build
npm run check:built
npm start
```

Tests cover Markdown sanitization, unsafe slugs, draft exclusion, metadata, and local page loading. No external service is needed for the build. Next.js 16 does not run lint during a production build, so run it separately.

Next.js is pinned to a reviewed release in `package.json`. Apply future security updates deliberately and commit the regenerated `package-lock.json`. React 18 remains supported with a deprecation notice from Next.js; it does not prevent the current build.

## Copy, SEO and branding

The November 2026 copy update positions Brightseed around websites, web applications and AI. Core services are defined in `lib/services.mjs`; project summaries and case-study content are in `content/homepage.json`. The 11 imported articles retain their original publication dates and URLs, with a genuine `updated` date after revision. A new AI pilot guide supports the AI service. Articles are attributed to Brightseed.

`PageSeo` provides canonical URLs, social cards and safely serialised JSON-LD. `/sitemap.xml` includes published pages, services, projects and articles; `/robots.txt` links to it. The `prebuild` and `predev` scripts generate `public/sitemap.xml` from validated local content before Next.js starts. Production serves that file directly, without reading Markdown or checking local image files in a serverless function. The generated XML is ignored by Git; use `npm run build` as the Vercel Build Command. After editing content during development, restart `npm run dev` to refresh the sitemap. All published articles appear as ordinary links in the initial blog HTML. Related articles are selected by shared topics. `npm run check:built` checks generated pages and the static sitemap after a production build.

Set `NEXT_PUBLIC_SITE_INDEXABLE=false` **before building** a preview or staging deployment to emit `noindex, follow`. Protect private previews with hosting authentication as well. Leave it unset for the public site. `SITE_URL` in `lib/site-config.mjs` is the canonical production origin. Search results use the canonical blog URL and are marked noindex when the client search state is active.

The preferred production domain is **https://brightseed.io** (without `www`). Canonicals, Open Graph URLs, JSON-LD, robots.txt and sitemap entries use this origin. In Vercel Project Settings → Domains, connect `brightseed.io` directly to Production and set `www.brightseed.io` to permanently redirect to `brightseed.io`, preserving paths and query strings. Remove the existing root-to-www redirect first. Domain settings are managed by Vercel and are not changed by deploying this repository; adding the opposite application redirect while the existing hosting redirect remains would create a loop. After deployment, verify that `https://brightseed.io/sitemap.xml` returns XML with HTTP 200 and no redirect, and that a `www` page redirects to the equivalent root-domain URL.

The browser icons, app icons and root `/favicon.ico` use the blue-and-amber symbol only. Their manifest paths point to `/favicon/`. The social sharing graphic is `/design/agency/share-card.png`; generated masters and prompt notes are retained under `output/branding/`.

After deployment, submit `/sitemap.xml` in the existing Search Console property and inspect indexing and Core Web Vitals using actual production data. Search Console ownership, analytics accounts and hosting-level redirects are not configured by this repository. Google Analytics is planned but not enabled. Update the privacy policy and implement the appropriate visitor choices before activating it; no tracking has been added in this change.
