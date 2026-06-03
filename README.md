# Kerry Knows Money Cloudflare Site

Static Cloudflare Pages site for migrating `www.kerryknowsmoney.com` from Squarespace to GitHub and Cloudflare Pages.

## Files

- `index.html` - single-page site covering the book, course waitlist, about, and recent blog topics.
- `styles.css` - responsive styling.
- `script.js` - mobile navigation and waitlist form submission.
- `functions/api/lead.js` - Cloudflare Pages Function that sends waitlist leads through Resend.
- `_redirects` - redirects old Squarespace paths into the new page sections.

## Required Cloudflare Pages variables

Set these in Cloudflare Pages settings before the form can send email:

```text
RESEND_API_KEY=your_resend_key
LEAD_TO_EMAIL=Kerry@KerryKnowsMoney.com
LEAD_FROM_EMAIL=Kerry Knows Money <verified-sender@yourdomain.com>
```

`LEAD_FROM_EMAIL` should use a Resend-verified sender/domain before production launch.
