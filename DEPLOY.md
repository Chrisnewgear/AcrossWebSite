# Deploy (Hostinger)

The contact/quote email backend is plain PHP + PHPMailer under `public/api/`.
`npm run build` copies it (and `.htaccess`) into `dist/`, so the whole site +
API deploy as one folder.

## Requirements

- PHP 7.4+ with the `openssl`, `mbstring` and `fileinfo` extensions.
- The site must be served from the **domain root**. Asset paths and the API
  calls (`/api/contact.php`) are root-absolute; a subfolder deploy breaks both.

## Build
1. `npm run build` — outputs `dist/` (includes `api/` and `.htaccess`).
2. Confirm `dist/.htaccess` and `dist/api/contact.php` exist. Vite 8 copies
   dotfiles from `publicDir`; if a future version stops doing so, copy it
   manually: `cp public/.htaccess dist/.htaccess`.

## Upload
3. Upload the **contents** of `dist/` into `public_html/` on Hostinger
   (hPanel File Manager or FTP).

## Configure secrets (once, on the server)
4. In hPanel → Emails, create/confirm a mailbox on the domain (e.g.
   `info@acrosscon.com`).
5. Copy `public_html/api/config.example.php` to `public_html/api/config.php`.
6. Edit `config.php`:
   - `SMTP_HOST = smtp.hostinger.com`, `SMTP_PORT = 465`
   - `SMTP_USER` / `MAIL_FROM` = the mailbox address (same value)
   - `SMTP_PASS` = that mailbox's password
   - `RECIPIENT` = where form emails should land (`info@acrosscon.com`)
   `config.php` is gitignored and must NEVER be committed.
7. In hPanel → PHP config, confirm `post_max_size` and `upload_max_filesize`
   are ≥ 12M (headroom over the 10 MB attachment cap).

## Verify the server (before touching the forms)
8. Open `https://<domain>/api/health.php` — checks PHP extensions and that
   `config.php` exists with every key filled in. Expect `"ok": true`.
9. Open `https://<domain>/api/health.php?smtp=1` — additionally opens an
   authenticated SMTP session (connect + AUTH + quit; sends no mail). This is
   what catches a wrong `SMTP_PASS` or a blocked port 465. Expect `"ok": true`.
10. **Delete `public_html/api/health.php` once both pass.** It is a diagnostic,
    not part of the site.

## Smoke test (live)
11. Submit the Contacto form → email arrives at `RECIPIENT`; Reply-To is the
    visitor's address (hit reply → goes to the customer).
12. Submit the Cotización form with a PDF → email arrives with the PDF attached.
13. If mail lands in spam: in hPanel → Emails, verify SPF and DKIM DNS records
    for the domain are present and valid.

## Notes
- Endpoints are same-origin (`/api/contact.php`, `/api/cotizacion.php`) — no
  CORS config needed.
- `.htaccess` provides the SPA route fallback and blocks direct web access to
  `api/config.php` and `api/lib/`.
- To re-deploy after code changes, rebuild and re-upload `dist/` — but do NOT
  overwrite the server's `api/config.php` (it isn't in the build). In
  particular, never wipe `public_html/` before uploading: that deletes it and
  every form silently starts returning "could not be sent".
- **Rate limit:** each endpoint accepts 5 submissions per IP per hour, counted
  only for requests that reach the send step. Repeated smoke tests from the
  same IP will start returning HTTP 429 — that is the throttle working, not a
  failure. Reset by deleting `rl_contact_*.json` / `rl_cotizacion_*.json` from
  the server's temp dir.
- **Honeypot:** both forms carry a hidden `nombre_confirmacion` field that must
  arrive empty; if it is filled the server returns success and sends nothing.
  Do not rename it to `website`/`url` — browsers autofill those even with
  `autocomplete="off"`, which would silently discard real messages. The old
  `website` name is still accepted server-side so visitors holding a cached JS
  bundle keep working across the deploy.

## Local testing
- PHP endpoints need a PHP CLI: `php -S localhost:8000 -t public`.
- Frontend dev: `npm run dev` (Vite proxies `/api` → `localhost:8000`).
- Backend tests: `php test/validate.test.php`, `php test/body.test.php`,
  `php test/mailer.test.php`, `php test/ratelimit.test.php`; endpoint guards:
  `bash test/api.curl.sh` (with the PHP server running).
