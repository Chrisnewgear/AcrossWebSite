# Deploy (Hostinger)

The contact/quote email backend is plain PHP + PHPMailer under `public/api/`.
`npm run build` copies it (and `.htaccess`) into `dist/`, so the whole site +
API deploy as one folder.

## Build
1. `npm run build` — outputs `dist/` (includes `api/` and `.htaccess`).
2. Confirm `dist/.htaccess` and `dist/api/contact.php` exist. If `.htaccess`
   is missing (some Vite versions skip dotfiles in publicDir), copy it manually:
   `cp public/.htaccess dist/.htaccess`.

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

## Smoke test (live)
8. Submit the Contacto form → email arrives at `RECIPIENT`; Reply-To is the
   visitor's address (hit reply → goes to the customer).
9. Submit the Cotización form with a PDF → email arrives with the PDF attached.
10. If mail lands in spam: in hPanel → Emails, verify SPF and DKIM DNS records
    for the domain are present and valid.

## Notes
- Endpoints are same-origin (`/api/contact.php`, `/api/cotizacion.php`) — no
  CORS config needed.
- `.htaccess` provides the SPA route fallback and blocks direct web access to
  `api/config.php` and `api/lib/`.
- To re-deploy after code changes, rebuild and re-upload `dist/` — but do NOT
  overwrite the server's `api/config.php` (it isn't in the build).

## Local testing
- PHP endpoints need a PHP CLI: `php -S localhost:8000 -t public`.
- Frontend dev: `npm run dev` (Vite proxies `/api` → `localhost:8000`).
- Backend tests: `php test/validate.test.php`, `php test/body.test.php`,
  `php test/mailer.test.php`; endpoint guards: `bash test/api.curl.sh`
  (with the PHP server running).
