# Contact & Quote Email Backend — Design

**Date:** 2026-07-03
**Status:** Approved (pending spec review)
**Scope:** PHP email backend for the Contacto and Cotización forms, plus the frontend wiring and a PDF attachment on Cotización.

## Goal

Replace the current fake `setTimeout` form submissions on `src/pages/Contacto/index.jsx` and `src/pages/Cotizacion/index.jsx` with real email delivery. When a visitor submits either form, an email is sent to `info@acrosscon.com` containing the form data. The Cotización form additionally allows attaching one PDF document.

## Context & Constraints

- Frontend is a Vite + React 19 SPA (react-router-dom). No backend exists today; both forms fake success with `setTimeout`.
- Production host is **Hostinger shared hosting** (PHP / LiteSpeed). No persistent Node process.
- Mail sends **from a Hostinger domain mailbox** over authenticated SMTP (`smtp.hostinger.com`, SSL 465) for SPF/DKIM deliverability.
- Recipient: `info@acrosscon.com` (single recipient for both forms; configurable).
- Static build and PHP API share one domain → no CORS in production, one deploy.

## Non-Goals

- No database / persistence of submissions.
- No routing to per-department mailboxes (`comex@`, `documentacion@`) — single recipient, configurable later.
- No CAPTCHA service. Bot mitigation is a honeypot field only.
- No Composer dependency on the host — PHPMailer is vendored.

## Architecture

Everything ships into Hostinger `public_html`:

```
public_html/
  index.html, assets/            # Vite build output (npm run build)
  .htaccess                      # SPA route fallback + protect api/config & lib
  api/
    contact.php                  # Contacto endpoint  (POST JSON)
    cotizacion.php               # Cotización endpoint (POST multipart + PDF)
    config.php                   # SMTP creds + settings — gitignored, created on server
    config.example.php           # committed template with placeholders
    lib/
      PHPMailer/                 # vendored: PHPMailer.php, SMTP.php, Exception.php
      mailer.php                 # send_mail() wrapper around PHPMailer + config
      validate.php               # required(), valid_email(), strip_headers()
      respond.php                # json_response(), method guard
```

### Request flow

1. Browser submits form → `fetch` to `/api/contact.php` (JSON) or `/api/cotizacion.php` (`FormData`).
2. Endpoint: method guard (POST only, else 405) → read input → honeypot check → validate → (cotización) validate file → build subject + HTML/text body → `send_mail()` via SMTP → JSON response.
3. Browser: on `{ok:true}` show existing success state; on error show new error state with retry.

## Components

### `api/lib/respond.php`
- `json_response($status, $payload)` — sets `Content-Type: application/json`, HTTP status, echoes JSON, exits.
- `require_post()` — if `$_SERVER['REQUEST_METHOD'] !== 'POST'`, respond 405 and exit.

### `api/lib/validate.php`
Pure functions, unit-testable:
- `required(array $data, array $fields): array` — returns list of missing/empty field names.
- `valid_email(string $email): bool` — `filter_var(..., FILTER_VALIDATE_EMAIL)`.
- `strip_headers(string $v): string` — removes CR/LF to prevent email header injection.
- `clean(string $v): string` — `trim` + `htmlspecialchars` for safe HTML body embedding.

### `api/lib/mailer.php`
- `send_mail(array $opts): void` where `$opts = { subject, htmlBody, textBody, replyToEmail, replyToName, attachments[] }`.
- Configures PHPMailer from `config.php`: SMTP host/port/user/pass, `From` = mailbox, `addAddress(RECIPIENT)`, `addReplyTo(replyToEmail, replyToName)`. Subject and reply values passed through `strip_headers()`.
- `attachments[]` entries are `{ tmp_path, filename }` → `addAttachment()`. Throws on send failure (caller maps to 500).

### `api/contact.php`
- `require_post()`.
- Parse JSON body (`php://input`).
- Honeypot: if `website` non-empty → `json_response(200, {ok:true})` and stop (silent drop).
- `required(['nombre','email','asunto','mensaje'])`; if missing → 422 `{ok:false, error, fields}`.
- `valid_email` → else 422.
- Compose subject `[Contacto] {asunto} — {nombre}` (asuntoOtro used when asunto is the "Otro" option), HTML table + plaintext of: nombre, empresa, email, telefono, asunto (+ asuntoOtro), mensaje.
- `send_mail()`; success → 200 `{ok:true}`, exception → 500 `{ok:false, error}`.

### `api/cotizacion.php`
- `require_post()`.
- Read `$_POST` fields; honeypot `website` → silent ok.
- `required(['service','origen','destino','nombre','email'])`; email validity.
- File `documento` (optional):
  - If present and `error !== UPLOAD_ERR_NO_FILE`:
    - `error === UPLOAD_ERR_OK` else → 422 (upload failed / too large).
    - size ≤ `MAX_FILE_MB` (10) → else 422.
    - extension is `.pdf` (case-insensitive) → else 422.
    - `finfo` MIME `=== 'application/pdf'` → else 422.
    - attach `{ tmp_path: tmp_name, filename: basename(original) }`.
- Subject `[Cotización] {service}: {origen}→{destino} — {nombre}`, body table of all fields (service, origen, destino, incoterm, peso, volumen, nombre, empresa, email, telefono, descripcion, comentarios) + note if a document is attached.
- `send_mail()` → 200 / 500.

### `.htaccess`
- SPA fallback: rewrite non-file, non-`/api` requests to `index.html`.
- Deny direct web access to `api/config.php` and `api/lib/` (defense in depth; PHP still `require`s them internally).

## Frontend Changes

### `src/pages/Contacto/index.jsx`
- `handleSubmit` → `async`, `fetch('/api/contact.php', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })`.
- Payload = current `form` (nombre, empresa, email, telefono, asunto, asuntoOtro, mensaje) + `website: ""` honeypot.
- Add hidden honeypot input (visually hidden, `tabIndex=-1`, `autoComplete="off"`).
- New `error` state + error UI block (there is none today): on `!res.ok` or `{ok:false}`, show error message with the submit button re-enabled for retry.

### `src/pages/Cotizacion/index.jsx`
- Add a **PDF file input** (step 1, near descripción). Store `File` in state (`documento`). Show filename + a "PDF only, max 10 MB" hint; client-side pre-check on type/size for fast feedback (server still authoritative).
- `handleSubmit` → build `FormData` from all fields + honeypot + `documento` (if chosen), `fetch('/api/cotizacion.php', { method:'POST', body: formData })` (no manual Content-Type — browser sets multipart boundary).
- New `error` state + error UI (reuse pattern from Contacto).

### `src/i18n/translations.js`
Add ES + EN strings:
- `contacto.error` / `cotizacion.error` — failure message + retry label.
- `cotizacion.labels.documento`, `cotizacion.placeholders.documento`, file hint ("Solo PDF · máx 10 MB" / "PDF only · max 10 MB"), and client-side validation messages (wrong type / too large).

## Secrets & Configuration

- `config.example.php` (committed) exposes: `RECIPIENT`, `MAIL_FROM`, `MAIL_FROM_NAME`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAX_FILE_MB`.
- `.gitignore` += `api/config.php`. Real `config.php` is created directly on the Hostinger server (never committed).

## Local Development

- Vite dev server (`:5173`) cannot execute PHP. Add a dev proxy in `vite.config.js`: `/api` → `http://localhost:8000`.
- Run PHP locally for testing: `php -S localhost:8000 -t public_html` (requires PHP installed on Windows). Point a local `config.php` at a test mailbox or Mailtrap.
- Production uses the relative `/api/...` path directly; no proxy involved.

## Verification

- `curl` scripts for both endpoints covering: valid submit, missing required field (422), honeypot filled (200 + no mail), oversized PDF (422), non-PDF disguised as `.pdf` (422), valid PDF attached (200 + attachment received).
- Tiny pure-PHP test asserting `validate.php` functions (`required`, `valid_email`, `strip_headers`) — run with `php test/validate.test.php`. No PHP test framework added.
- Manual end-to-end: submit each form from the built site on a Hostinger staging path, confirm mail arrives at `info@acrosscon.com` with correct Reply-To and (for Cotización) the PDF attached.

## Deploy Checklist

1. `npm run build`.
2. Upload `dist/*` + `api/` + `.htaccess` to `public_html`.
3. Create `public_html/api/config.php` from `config.example.php` with real Hostinger mailbox SMTP creds.
4. Confirm PHP `upload_max_filesize` / `post_max_size` ≥ 10 MB (Hostinger default is higher; note in docs).
5. Smoke-test both forms live.

## Risks & Notes

- Deliverability depends on the sending mailbox being on the same domain with SPF/DKIM configured in Hostinger DNS. Sending `From` a non-owned address will land in spam.
- If the Hostinger plan turns out to be Node-only / static-only (no PHP), this design must switch to the Node + Nodemailer variant — confirm PHP availability in hPanel before build.
- Honeypot is light bot protection; if spam becomes a problem, add hCaptcha/Turnstile later (out of scope now).
