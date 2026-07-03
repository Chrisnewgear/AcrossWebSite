# Contact & Quote Email Backend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Send real emails to `info@acrosscon.com` when the Contacto and Cotización forms are submitted, with an optional PDF attachment on Cotización.

**Architecture:** PHP + PHPMailer backend lives under `public/api/` so `npm run build` copies it into `dist/` as a single deploy artifact for Hostinger shared hosting. Frontend forms POST to same-origin `/api/*.php` endpoints (JSON for Contacto, multipart for Cotización). Mail sends over authenticated Hostinger-mailbox SMTP.

**Tech Stack:** Vite 8 + React 19 (existing), PHP 8 + PHPMailer 6.9 (vendored, no Composer on host).

## Global Constraints

- **Host:** Hostinger shared hosting (PHP/LiteSpeed). No Node process in production.
- **Recipient:** `info@acrosscon.com` for both forms (configurable via `RECIPIENT` in config).
- **SMTP:** `smtp.hostinger.com`, port `465`, `ENCRYPTION_SMTPS` (SSL). `From` must be a mailbox on the sending domain.
- **Secrets:** `public/api/config.php` is gitignored and created on the server. Only `config.example.php` is committed.
- **Max upload:** PDF only, **10 MB** cap (`MAX_FILE_MB`). Validated server-side (extension + `finfo` MIME) and pre-checked client-side.
- **Bot mitigation:** hidden honeypot field named `website`; if non-empty, endpoint returns `{ok:true}` and drops silently.
- **Backend source location:** everything under `public/api/`; `.htaccess` at `public/.htaccess`. Both get copied into `dist/` by Vite.
- **Response shape:** every endpoint returns JSON `{ok:true}` or `{ok:false, error, fields?}` with status 200 / 400 / 405 / 422 / 500.

## Prerequisites (read before starting)

- **PHP CLI is NOT installed on this Windows machine.** Backend unit tests (Tasks 1-3) and endpoint curl tests (Tasks 4-5) require it. Install PHP 8: `winget install --id PHP.PHP -e` (or download from windows.php.net and add to PATH), then confirm with `php -v`. If PHP cannot be installed locally, run the documented test commands on a Hostinger staging subdomain after deploy instead — do not skip them.
- **No JS test framework exists** in this repo (only ESLint). Frontend tasks are verified with `npm run lint` + `npm run build` + manual browser check. Do not add Vitest/Jest (YAGNI — zero existing JS tests).
- Confirm in hPanel that the Hostinger plan runs PHP before building. If it is static/Node-only, stop and revisit the spec (Node+Nodemailer variant).

## File Structure

```
public/
  .htaccess                          # CREATE — SPA fallback + protect backend files
  api/
    contact.php                      # CREATE — Contacto endpoint (JSON)
    cotizacion.php                   # CREATE — Cotización endpoint (multipart + PDF)
    config.example.php               # CREATE — committed config template
    config.php                       # (server only, gitignored)
    lib/
      respond.php                    # CREATE — json_response(), require_post()
      validate.php                   # CREATE — required/valid_email/strip_headers/clean
      body.php                       # CREATE — build_bodies()
      mailer.php                     # CREATE — build_message(), send_mail(), load_config()
      PHPMailer/                     # CREATE (vendored) — PHPMailer.php, SMTP.php, Exception.php
test/
  validate.test.php                  # CREATE
  body.test.php                      # CREATE
  mailer.test.php                    # CREATE
  api.curl.sh                        # CREATE — endpoint smoke tests
vite.config.js                       # MODIFY — dev proxy /api -> localhost:8000
.gitignore                           # MODIFY — ignore public/api/config.php
src/pages/Contacto/index.jsx         # MODIFY — real fetch, honeypot, error state
src/pages/Contacto/styles.module.scss# MODIFY — .form-error, .honeypot
src/pages/Cotizacion/index.jsx       # MODIFY — file input, real fetch, error state
src/pages/Cotizacion/styles.module.scss # MODIFY — .form-error, .file-hint
src/i18n/translations.js             # MODIFY — error + file strings (ES + EN)
DEPLOY.md                            # CREATE — build + upload + config checklist
```

---

### Task 1: `validate.php` — input validation helpers

**Files:**
- Create: `public/api/lib/validate.php`
- Test: `test/validate.test.php`

**Interfaces:**
- Produces: `required(array $data, array $fields): array` (missing field names), `valid_email(string): bool`, `strip_headers(string): string` (removes CR/LF), `clean(string): string` (`trim`+`htmlspecialchars`).

- [ ] **Step 1: Write the failing test**

Create `test/validate.test.php`:

```php
<?php
require __DIR__ . '/../public/api/lib/validate.php';

$fails = 0;
function check($cond, $msg) {
    global $fails;
    if (!$cond) { $fails++; echo "FAIL: $msg\n"; } else { echo "ok: $msg\n"; }
}

check(required(['a' => 'x'], ['a', 'b']) === ['b'], 'required returns missing field');
check(required(['a' => '  '], ['a']) === ['a'], 'required treats whitespace as empty');
check(required(['a' => 'x'], ['a']) === [], 'required passes when present');
check(valid_email('x@y.com') === true, 'accepts valid email');
check(valid_email('nope') === false, 'rejects invalid email');
check(strip_headers("a\r\nb") === 'ab', 'strip_headers removes CRLF');
check(clean('<b>') === '&lt;b&gt;', 'clean escapes html');

echo $fails === 0 ? "\nALL PASS\n" : "\n$fails FAILURES\n";
exit($fails === 0 ? 0 : 1);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `php test/validate.test.php`
Expected: FAIL — `require ... validate.php` errors (file does not exist).

- [ ] **Step 3: Write the implementation**

Create `public/api/lib/validate.php`:

```php
<?php

function required(array $data, array $fields): array {
    $missing = [];
    foreach ($fields as $f) {
        if (!isset($data[$f]) || trim((string) $data[$f]) === '') {
            $missing[] = $f;
        }
    }
    return $missing;
}

function valid_email(string $email): bool {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function strip_headers(string $v): string {
    return trim(str_replace(["\r", "\n", "%0a", "%0d", "%0A", "%0D"], '', $v));
}

function clean(string $v): string {
    return htmlspecialchars(trim($v), ENT_QUOTES, 'UTF-8');
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `php test/validate.test.php`
Expected: `ALL PASS`, exit 0.

- [ ] **Step 5: Commit**

```bash
git add public/api/lib/validate.php test/validate.test.php
git commit -m "feat(api): add validation helpers with tests"
```

---

### Task 2: `respond.php`, `body.php`, config template, gitignore

**Files:**
- Create: `public/api/lib/respond.php`, `public/api/lib/body.php`, `public/api/config.example.php`
- Modify: `.gitignore`
- Test: `test/body.test.php`

**Interfaces:**
- Consumes: `clean()` from Task 1.
- Produces: `json_response(int $status, array $payload): void` (exits), `require_post(): void` (405s on non-POST), `build_bodies(string $heading, array $fields): array` returning `[$html, $text]`.

- [ ] **Step 1: Write the failing test**

Create `test/body.test.php`:

```php
<?php
require __DIR__ . '/../public/api/lib/validate.php';
require __DIR__ . '/../public/api/lib/body.php';

[$html, $text] = build_bodies('Heading', ['Email' => 'a@b.com', 'Empty' => '']);

$fails = 0;
function check($c, $m) {
    global $fails;
    if (!$c) { $fails++; echo "FAIL: $m\n"; } else { echo "ok: $m\n"; }
}

check(strpos($html, 'a@b.com') !== false, 'html contains value');
check(strpos($text, 'Email: a@b.com') !== false, 'text contains labelled value');
check(strpos($html, '—') !== false, 'empty value renders dash');
check(strpos($html, '<table') !== false, 'html has a table');
check(strpos($html, '&lt;') === false, 'no unescaped payload leaked');

echo $fails === 0 ? "\nALL PASS\n" : "\n$fails FAILURES\n";
exit($fails === 0 ? 0 : 1);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `php test/body.test.php`
Expected: FAIL — `body.php` does not exist.

- [ ] **Step 3: Write the implementations**

Create `public/api/lib/respond.php`:

```php
<?php

function json_response(int $status, array $payload): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload);
    exit;
}

function require_post(): void {
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
        json_response(405, ['ok' => false, 'error' => 'Method not allowed']);
    }
}
```

Create `public/api/lib/body.php`:

```php
<?php
require_once __DIR__ . '/validate.php';

/** Build HTML + plaintext email bodies from an ordered label => value map. */
function build_bodies(string $heading, array $fields): array {
    $rowsHtml = '';
    $text = $heading . "\n\n";
    foreach ($fields as $label => $value) {
        $v = trim((string) $value);
        if ($v === '') { $v = '—'; }
        $rowsHtml .= '<tr>'
            . '<td style="padding:6px 12px;font-weight:600;color:#334;border-bottom:1px solid #eee;vertical-align:top">' . clean($label) . '</td>'
            . '<td style="padding:6px 12px;border-bottom:1px solid #eee;white-space:pre-wrap">' . nl2br(clean($v)) . '</td>'
            . '</tr>';
        $text .= $label . ': ' . $v . "\n";
    }
    $html = '<div style="font-family:Arial,sans-serif;max-width:640px">'
        . '<h2 style="color:#0a2540">' . clean($heading) . '</h2>'
        . '<table style="border-collapse:collapse;width:100%">' . $rowsHtml . '</table>'
        . '</div>';
    return [$html, $text];
}
```

Create `public/api/config.example.php`:

```php
<?php
// Copy this file to config.php ON THE SERVER and fill in real values.
// config.php is gitignored — never commit real credentials.
return [
    'RECIPIENT'      => 'info@acrosscon.com',
    'MAIL_FROM'      => 'info@acrosscon.com',   // must be a mailbox on this domain
    'MAIL_FROM_NAME' => 'Across Web',
    'SMTP_HOST'      => 'smtp.hostinger.com',
    'SMTP_PORT'      => 465,
    'SMTP_USER'      => 'info@acrosscon.com',
    'SMTP_PASS'      => 'CHANGE_ME',
    'MAX_FILE_MB'    => 10,
];
```

- [ ] **Step 4: Add gitignore entry**

Append to `.gitignore`:

```
# Backend secrets (created on server, never committed)
public/api/config.php
```

- [ ] **Step 5: Run test to verify it passes**

Run: `php test/body.test.php`
Expected: `ALL PASS`, exit 0.

- [ ] **Step 6: Commit**

```bash
git add public/api/lib/respond.php public/api/lib/body.php public/api/config.example.php test/body.test.php .gitignore
git commit -m "feat(api): add response, body builder, config template"
```

---

### Task 3: Vendor PHPMailer + `mailer.php`

**Files:**
- Create: `public/api/lib/PHPMailer/{PHPMailer.php,SMTP.php,Exception.php}` (downloaded), `public/api/lib/mailer.php`
- Test: `test/mailer.test.php`

**Interfaces:**
- Consumes: `strip_headers()` from Task 1.
- Produces: `build_message(PHPMailer $mail, array $opts, array $cfg): void`, `send_mail(array $opts): void`, `load_config(): array`. `$opts = { subject, htmlBody, textBody, replyToEmail, replyToName, attachments:[{tmp_path,filename}] }`.

- [ ] **Step 1: Vendor PHPMailer (pinned v6.9.3)**

Run (from repo root):

```bash
mkdir -p public/api/lib/PHPMailer
BASE=https://raw.githubusercontent.com/PHPMailer/PHPMailer/v6.9.3/src
curl -fSL $BASE/PHPMailer.php -o public/api/lib/PHPMailer/PHPMailer.php
curl -fSL $BASE/SMTP.php      -o public/api/lib/PHPMailer/SMTP.php
curl -fSL $BASE/Exception.php -o public/api/lib/PHPMailer/Exception.php
```

Expected: three files downloaded, each non-empty (`PHPMailer.php` is ~5000 lines).

- [ ] **Step 2: Write the failing test**

Create `test/mailer.test.php`:

```php
<?php
require __DIR__ . '/../public/api/lib/validate.php';
require __DIR__ . '/../public/api/lib/mailer.php';

$cfg = [
    'RECIPIENT' => 'to@acrosscon.com', 'MAIL_FROM' => 'from@acrosscon.com',
    'MAIL_FROM_NAME' => 'Across', 'SMTP_HOST' => 'localhost', 'SMTP_PORT' => 465,
    'SMTP_USER' => 'u', 'SMTP_PASS' => 'p', 'MAX_FILE_MB' => 10,
];

$tmp = tempnam(sys_get_temp_dir(), 'pdf');
file_put_contents($tmp, "%PDF-1.4 test");

$mail = new PHPMailer\PHPMailer\PHPMailer(true);
build_message($mail, [
    'subject' => "Hi\r\nInjected", 'htmlBody' => '<p>x</p>', 'textBody' => 'x',
    'replyToEmail' => 'client@x.com', 'replyToName' => 'Client',
    'attachments' => [['tmp_path' => $tmp, 'filename' => 'doc.pdf']],
], $cfg);
$mail->preSend();
$mime = $mail->getSentMIMEMessage();

$fails = 0;
function check($c, $m) {
    global $fails;
    if (!$c) { $fails++; echo "FAIL: $m\n"; } else { echo "ok: $m\n"; }
}

check(strpos($mime, 'Subject: HiInjected') !== false, 'subject set, header injection stripped');
check(strpos($mime, 'client@x.com') !== false, 'reply-to set');
check(strpos($mime, 'doc.pdf') !== false, 'attachment present');
check(strpos($mime, 'to@acrosscon.com') !== false, 'recipient set');

echo $fails === 0 ? "\nALL PASS\n" : "\n$fails FAILURES\n";
exit($fails === 0 ? 0 : 1);
```

- [ ] **Step 3: Run test to verify it fails**

Run: `php test/mailer.test.php`
Expected: FAIL — `mailer.php` does not exist.

- [ ] **Step 4: Write the implementation**

Create `public/api/lib/mailer.php`:

```php
<?php
use PHPMailer\PHPMailer\PHPMailer;

require_once __DIR__ . '/validate.php';
require_once __DIR__ . '/PHPMailer/Exception.php';
require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';

function load_config(): array {
    $path = __DIR__ . '/../config.php';
    if (!file_exists($path)) {
        throw new RuntimeException('Missing config.php');
    }
    return require $path;
}

/** Configure a PHPMailer instance from options + config. No network I/O. */
function build_message(PHPMailer $mail, array $opts, array $cfg): void {
    $mail->isSMTP();
    $mail->Host       = $cfg['SMTP_HOST'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $cfg['SMTP_USER'];
    $mail->Password   = $cfg['SMTP_PASS'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = (int) $cfg['SMTP_PORT'];
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom($cfg['MAIL_FROM'], $cfg['MAIL_FROM_NAME']);
    $mail->addAddress($cfg['RECIPIENT']);
    if (!empty($opts['replyToEmail'])) {
        $mail->addReplyTo(strip_headers($opts['replyToEmail']), strip_headers($opts['replyToName'] ?? ''));
    }
    foreach ($opts['attachments'] ?? [] as $att) {
        $mail->addAttachment($att['tmp_path'], $att['filename']);
    }
    $mail->isHTML(true);
    $mail->Subject = strip_headers($opts['subject']);
    $mail->Body    = $opts['htmlBody'];
    $mail->AltBody = $opts['textBody'];
}

function send_mail(array $opts): void {
    $cfg  = load_config();
    $mail = new PHPMailer(true);
    build_message($mail, $opts, $cfg);
    $mail->send();
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `php test/mailer.test.php`
Expected: `ALL PASS`, exit 0.

- [ ] **Step 6: Commit**

```bash
git add public/api/lib/PHPMailer public/api/lib/mailer.php test/mailer.test.php
git commit -m "feat(api): vendor PHPMailer and add mailer wrapper"
```

---

### Task 4: `contact.php` endpoint

**Files:**
- Create: `public/api/contact.php`
- Test: `test/api.curl.sh` (created here, extended in Task 5)

**Interfaces:**
- Consumes: `require_post`, `json_response`, `required`, `valid_email`, `build_bodies`, `send_mail`.

- [ ] **Step 1: Write the endpoint**

Create `public/api/contact.php`:

```php
<?php
require_once __DIR__ . '/lib/respond.php';
require_once __DIR__ . '/lib/validate.php';
require_once __DIR__ . '/lib/body.php';
require_once __DIR__ . '/lib/mailer.php';

require_post();

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) {
    json_response(400, ['ok' => false, 'error' => 'Invalid JSON']);
}

// Honeypot: pretend success, send nothing.
if (!empty($data['website'])) {
    json_response(200, ['ok' => true]);
}

$missing = required($data, ['nombre', 'email', 'asunto', 'mensaje']);
if ($missing) {
    json_response(422, ['ok' => false, 'error' => 'Missing required fields', 'fields' => $missing]);
}
if (!valid_email($data['email'])) {
    json_response(422, ['ok' => false, 'error' => 'Invalid email', 'fields' => ['email']]);
}

$asunto = (string) $data['asunto'];
if (!empty($data['asuntoOtro'])) {
    $asunto .= ' — ' . $data['asuntoOtro'];
}

[$html, $text] = build_bodies('Nuevo mensaje de contacto', [
    'Nombre'   => $data['nombre'] ?? '',
    'Empresa'  => $data['empresa'] ?? '',
    'Email'    => $data['email'] ?? '',
    'Teléfono' => $data['telefono'] ?? '',
    'Asunto'   => $asunto,
    'Mensaje'  => $data['mensaje'] ?? '',
]);

try {
    send_mail([
        'subject'      => '[Contacto] ' . $asunto . ' — ' . $data['nombre'],
        'htmlBody'     => $html,
        'textBody'     => $text,
        'replyToEmail' => $data['email'],
        'replyToName'  => $data['nombre'],
    ]);
    json_response(200, ['ok' => true]);
} catch (Throwable $e) {
    error_log('contact.php mail error: ' . $e->getMessage());
    json_response(500, ['ok' => false, 'error' => 'Mail send failed']);
}
```

- [ ] **Step 2: Create the endpoint smoke-test script**

Create `test/api.curl.sh`:

```bash
#!/usr/bin/env bash
# Prereq (separate terminal): php -S localhost:8000 -t public
# Validation/guard paths return before send_mail, so no config.php/SMTP needed for these.
set -u
BASE=http://localhost:8000/api
code() { curl -s -o /dev/null -w "%{http_code}" "$@"; }

echo "contact GET -> expect 405:            $(code $BASE/contact.php)"
echo "contact empty body -> expect 422:     $(code -X POST $BASE/contact.php -H 'Content-Type: application/json' -d '{}')"
echo "contact honeypot -> expect 200:       $(code -X POST $BASE/contact.php -H 'Content-Type: application/json' -d '{"website":"bot","nombre":"x","email":"a@b.com","asunto":"y","mensaje":"z"}')"
echo "contact bad email -> expect 422:      $(code -X POST $BASE/contact.php -H 'Content-Type: application/json' -d '{"nombre":"x","email":"nope","asunto":"y","mensaje":"z"}')"
```

- [ ] **Step 3: Run the smoke tests**

In terminal A: `php -S localhost:8000 -t public`
In terminal B: `bash test/api.curl.sh`
Expected: `405`, `422`, `200`, `422` in order.

- [ ] **Step 4: Commit**

```bash
git add public/api/contact.php test/api.curl.sh
git commit -m "feat(api): add contact.php endpoint with guard tests"
```

---

### Task 5: `cotizacion.php` endpoint (multipart + PDF)

**Files:**
- Create: `public/api/cotizacion.php`
- Modify: `test/api.curl.sh`

**Interfaces:**
- Consumes: same libs as Task 4. Reads `$_POST` + `$_FILES['documento']`.

- [ ] **Step 1: Write the endpoint**

Create `public/api/cotizacion.php`:

```php
<?php
require_once __DIR__ . '/lib/respond.php';
require_once __DIR__ . '/lib/validate.php';
require_once __DIR__ . '/lib/body.php';
require_once __DIR__ . '/lib/mailer.php';

require_post();

$data = $_POST;

if (!empty($data['website'])) {
    json_response(200, ['ok' => true]);
}

$missing = required($data, ['service', 'origen', 'destino', 'nombre', 'email']);
if ($missing) {
    json_response(422, ['ok' => false, 'error' => 'Missing required fields', 'fields' => $missing]);
}
if (!valid_email($data['email'])) {
    json_response(422, ['ok' => false, 'error' => 'Invalid email', 'fields' => ['email']]);
}

$maxMb = 10;
$configPath = __DIR__ . '/config.php';
if (file_exists($configPath)) {
    $maxMb = (int) (require $configPath)['MAX_FILE_MB'];
}
$maxBytes = $maxMb * 1024 * 1024;

$attachments = [];
$docNote = 'No';
$file = $_FILES['documento'] ?? null;

if ($file && ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
    if ($file['error'] !== UPLOAD_ERR_OK) {
        json_response(422, ['ok' => false, 'error' => 'File upload failed', 'fields' => ['documento']]);
    }
    if ($file['size'] > $maxBytes) {
        json_response(422, ['ok' => false, 'error' => 'File too large', 'fields' => ['documento']]);
    }
    if (strtolower(pathinfo($file['name'], PATHINFO_EXTENSION)) !== 'pdf') {
        json_response(422, ['ok' => false, 'error' => 'Only PDF allowed', 'fields' => ['documento']]);
    }
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime  = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);
    if ($mime !== 'application/pdf') {
        json_response(422, ['ok' => false, 'error' => 'Invalid PDF', 'fields' => ['documento']]);
    }
    $attachments[] = ['tmp_path' => $file['tmp_name'], 'filename' => basename($file['name'])];
    $docNote = 'Sí (' . basename($file['name']) . ')';
}

[$html, $text] = build_bodies('Nueva solicitud de cotización', [
    'Servicio'    => $data['service'] ?? '',
    'Origen'      => $data['origen'] ?? '',
    'Destino'     => $data['destino'] ?? '',
    'Incoterm'    => $data['incoterm'] ?? '',
    'Peso (kg)'   => $data['peso'] ?? '',
    'Volumen'     => $data['volumen'] ?? '',
    'Descripción' => $data['descripcion'] ?? '',
    'Nombre'      => $data['nombre'] ?? '',
    'Empresa'     => $data['empresa'] ?? '',
    'Email'       => $data['email'] ?? '',
    'Teléfono'    => $data['telefono'] ?? '',
    'Comentarios' => $data['comentarios'] ?? '',
    'Documento'   => $docNote,
]);

try {
    send_mail([
        'subject'      => '[Cotización] ' . $data['service'] . ': ' . $data['origen'] . '→' . $data['destino'] . ' — ' . $data['nombre'],
        'htmlBody'     => $html,
        'textBody'     => $text,
        'replyToEmail' => $data['email'],
        'replyToName'  => $data['nombre'],
        'attachments'  => $attachments,
    ]);
    json_response(200, ['ok' => true]);
} catch (Throwable $e) {
    error_log('cotizacion.php mail error: ' . $e->getMessage());
    json_response(500, ['ok' => false, 'error' => 'Mail send failed']);
}
```

- [ ] **Step 2: Extend the smoke-test script**

Append to `test/api.curl.sh`:

```bash

echo "cotizacion GET -> expect 405:         $(code $BASE/cotizacion.php)"
echo "cotizacion missing -> expect 422:     $(code -X POST $BASE/cotizacion.php -F 'nombre=x')"
printf '%%PDF-1.4 real' > /tmp/real.pdf
printf 'not a pdf'      > /tmp/fake.pdf
echo "cotizacion non-pdf mime -> expect 422:$(code -X POST $BASE/cotizacion.php -F 'service=Maritimo' -F 'origen=A' -F 'destino=B' -F 'nombre=x' -F 'email=a@b.com' -F 'documento=@/tmp/fake.pdf;type=application/pdf')"
echo "cotizacion honeypot -> expect 200:    $(code -X POST $BASE/cotizacion.php -F 'website=bot' -F 'service=Maritimo' -F 'origen=A' -F 'destino=B' -F 'nombre=x' -F 'email=a@b.com')"
```

- [ ] **Step 3: Run the smoke tests**

With `php -S localhost:8000 -t public` running: `bash test/api.curl.sh`
Expected new lines: `405`, `422`, `422` (fake.pdf fails the `finfo` MIME check even with a spoofed content-type header), `200`.

- [ ] **Step 4: Commit**

```bash
git add public/api/cotizacion.php test/api.curl.sh
git commit -m "feat(api): add cotizacion.php endpoint with PDF validation"
```

---

### Task 6: `.htaccess` + Vite dev proxy

**Files:**
- Create: `public/.htaccess`
- Modify: `vite.config.js`

- [ ] **Step 1: Create `.htaccess`**

Create `public/.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  # Serve real files/dirs and the API untouched
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteRule ^api/ - [L]
  # SPA fallback: everything else -> index.html
  RewriteRule ^ index.html [L]
</IfModule>

# Never serve backend secrets or library internals
<FilesMatch "^config(\.example)?\.php$">
  Require all denied
</FilesMatch>
RedirectMatch 403 ^/api/lib/
```

- [ ] **Step 2: Add the dev proxy**

Replace `vite.config.js` with:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Local PHP endpoints: run `php -S localhost:8000 -t public` in another terminal.
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})
```

- [ ] **Step 3: Verify build copies `.htaccess` into dist**

Run: `npm run build`
Then check the output: `ls -a dist/.htaccess dist/api/contact.php`
Expected: both exist. If `dist/.htaccess` is missing (some Vite versions skip dotfiles in publicDir), that is a known caveat — add a note in DEPLOY.md (Task 9) to copy it manually, and re-run to confirm it is present.

- [ ] **Step 4: Commit**

```bash
git add public/.htaccess vite.config.js
git commit -m "feat: add SPA .htaccess and Vite dev proxy for /api"
```

---

### Task 7: Wire the Contacto form to the backend

**Files:**
- Modify: `src/pages/Contacto/index.jsx`, `src/pages/Contacto/styles.module.scss`, `src/i18n/translations.js`

**Interfaces:**
- Consumes: `POST /api/contact.php` returning `{ok:true}` / `{ok:false}`.

- [ ] **Step 1: Add error copy to i18n (both languages)**

In `src/i18n/translations.js`, inside the **Spanish** `contacto` object (near its `success` key), add:

```js
      error: "No se pudo enviar el mensaje. Intente nuevamente o escríbanos a info@acrosscon.com.",
```

Inside the **English** `contacto` object, add:

```js
      error: "Your message could not be sent. Please try again or email us at info@acrosscon.com.",
```

- [ ] **Step 2: Add honeypot to the initial form state**

In `src/pages/Contacto/index.jsx`, add `website: ""` to the `INITIAL` object:

```js
const INITIAL = {
  nombre: "",
  empresa: "",
  email: "",
  telefono: "",
  asunto: "",
  asuntoOtro: "",
  mensaje: "",
  website: "", // honeypot — must stay empty
};
```

- [ ] **Step 2b: Add an error state**

Add next to the other `useState` calls:

```js
  const [error, setError] = useState(false);
```

- [ ] **Step 3: Replace `handleSubmit` with a real request**

Replace the existing `handleSubmit` (the `setTimeout` version) with:

```js
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error("send failed");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
```

- [ ] **Step 4: Add the honeypot input + error message to the form**

In the `<form>` (Contacto), immediately after the opening `<form ...>` tag add the honeypot:

```jsx
                    <input
                      type="text"
                      name="website"
                      className={s.honeypot}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={form.website}
                      onChange={update("website")}
                    />
```

And directly above the submit `<button>` add the error line:

```jsx
                    {error && <p className={s["form-error"]}>{tc.error}</p>}
```

- [ ] **Step 5: Add styles**

Append to `src/pages/Contacto/styles.module.scss`:

```scss
.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.form-error {
  margin: 0 0 12px;
  color: #c0392b;
  font-size: 0.9rem;
}
```

- [ ] **Step 6: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: no lint errors, build succeeds.

- [ ] **Step 7: Manual check**

Run `php -S localhost:8000 -t public` (needs a local `public/api/config.php` pointing at a test/Mailtrap SMTP for a real send) and `npm run dev`. Submit the Contacto form:
- Valid submit → success state renders.
- Stop the PHP server, submit again → error message renders, button re-enabled.

- [ ] **Step 8: Commit**

```bash
git add src/pages/Contacto/index.jsx src/pages/Contacto/styles.module.scss src/i18n/translations.js
git commit -m "feat(contacto): submit form to /api/contact.php with honeypot + error state"
```

---

### Task 8: Wire the Cotización form + PDF upload

**Files:**
- Modify: `src/pages/Cotizacion/index.jsx`, `src/pages/Cotizacion/styles.module.scss`, `src/i18n/translations.js`

**Interfaces:**
- Consumes: `POST /api/cotizacion.php` (multipart) returning `{ok:true}` / `{ok:false}`.

- [ ] **Step 1: Add i18n strings (both languages)**

In `src/i18n/translations.js`, inside the **Spanish** `cotizacion` object: add to its `labels` object `documento: "Documento (PDF)",`, and add these keys on the `cotizacion` object itself:

```js
      fileHint: "Opcional · Solo PDF · máx 10 MB",
      fileErrors: {
        type: "Solo se permiten archivos PDF.",
        size: "El archivo supera los 10 MB.",
      },
      error: "No se pudo enviar la solicitud. Intente nuevamente o escríbanos a info@acrosscon.com.",
```

Inside the **English** `cotizacion` object: add `documento: "Document (PDF)",` to its `labels`, and:

```js
      fileHint: "Optional · PDF only · max 10 MB",
      fileErrors: {
        type: "Only PDF files are allowed.",
        size: "The file exceeds 10 MB.",
      },
      error: "Your request could not be sent. Please try again or email us at info@acrosscon.com.",
```

- [ ] **Step 2: Add file + error state and a file handler**

In `src/pages/Cotizacion/index.jsx`, add state next to the existing `useState` calls:

```js
  const [documento, setDocumento] = useState(null);
  const [docError, setDocError] = useState("");
  const [error, setError] = useState(false);
```

Add a file handler (below the `update`/`setService` helpers):

```js
  const MAX_MB = 10;
  const handleFile = (e) => {
    const f = e.target.files?.[0] || null;
    setDocError("");
    if (f) {
      if (f.type !== "application/pdf") {
        setDocError(tc.fileErrors.type);
        e.target.value = "";
        return;
      }
      if (f.size > MAX_MB * 1024 * 1024) {
        setDocError(tc.fileErrors.size);
        e.target.value = "";
        return;
      }
    }
    setDocumento(f);
  };
```

- [ ] **Step 3: Replace `handleSubmit` with a multipart request**

Replace the existing `handleSubmit` (`setTimeout` version) with:

```js
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("website", ""); // honeypot
      if (documento) fd.append("documento", documento);
      const res = await fetch("/api/cotizacion.php", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error("send failed");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
```

- [ ] **Step 4: Add the file input (Step 1 of the wizard) + honeypot + error line**

In the Step 1 block, immediately after the descripción `form-group` (the `<textarea>` for `descripcion`), add:

```jsx
                        <div className={s["form-group"]}>
                          <label className={s["form-label"]}>
                            {tc.labels.documento}
                          </label>
                          <input
                            type="file"
                            accept="application/pdf,.pdf"
                            className={s["form-input"]}
                            onChange={handleFile}
                          />
                          <span className={s["file-hint"]}>{tc.fileHint}</span>
                          {docError && (
                            <span className={s["form-error"]}>{docError}</span>
                          )}
                        </div>
```

Immediately after the opening `<form ... onSubmit={handleSubmit}>` tag add the honeypot:

```jsx
                    <input
                      type="text"
                      name="website"
                      className={s.honeypot}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value=""
                      onChange={() => {}}
                    />
```

In the Step 3 block, directly above the submit `<button type="submit">`, add the send error line:

```jsx
                        {error && (
                          <p className={s["form-error"]}>{tc.error}</p>
                        )}
```

- [ ] **Step 5: Add styles**

Append to `src/pages/Cotizacion/styles.module.scss`:

```scss
.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.file-hint {
  display: block;
  margin-top: 4px;
  font-size: 0.8rem;
  color: #6b7280;
}

.form-error {
  display: block;
  margin: 8px 0 0;
  color: #c0392b;
  font-size: 0.9rem;
}
```

- [ ] **Step 6: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: no lint errors, build succeeds.

- [ ] **Step 7: Manual check**

With `php -S localhost:8000 -t public` and `npm run dev`: on Cotización step 1, choose a non-PDF → inline type error, input cleared. Choose a >10 MB PDF → size error. Choose a valid PDF → filename accepted. Complete the wizard and submit → success (real send needs a working local `config.php`).

- [ ] **Step 8: Commit**

```bash
git add src/pages/Cotizacion/index.jsx src/pages/Cotizacion/styles.module.scss src/i18n/translations.js
git commit -m "feat(cotizacion): PDF upload + submit to /api/cotizacion.php"
```

---

### Task 9: Deploy documentation

**Files:**
- Create: `DEPLOY.md`

- [ ] **Step 1: Write the deploy guide**

Create `DEPLOY.md`:

```markdown
# Deploy (Hostinger)

## Build
1. `npm run build` — outputs `dist/` (includes `api/` and `.htaccess`).
2. Confirm `dist/.htaccess` and `dist/api/contact.php` exist. If `.htaccess`
   is missing, copy it manually: `cp public/.htaccess dist/.htaccess`.

## Upload
3. Upload the **contents** of `dist/` into `public_html/` on Hostinger
   (File Manager or FTP).

## Configure secrets (once, on the server)
4. Copy `public_html/api/config.example.php` to `public_html/api/config.php`.
5. Edit `config.php`: set `SMTP_USER`/`SMTP_PASS` to a real mailbox on the
   domain (create it in hPanel → Emails). Keep `SMTP_HOST=smtp.hostinger.com`,
   `SMTP_PORT=465`. `MAIL_FROM` and `SMTP_USER` should be the same mailbox.
6. Verify PHP limits in hPanel: `post_max_size` and `upload_max_filesize`
   ≥ 12M (headroom over the 10 MB cap).

## Smoke test (live)
7. Submit the Contacto form → email arrives at `info@acrosscon.com`,
   Reply-To is the visitor's address.
8. Submit the Cotización form with a PDF → email arrives with the PDF attached.
9. If mail lands in spam: confirm SPF/DKIM for the domain in hPanel → Emails →
   DNS/DKIM.
```

- [ ] **Step 2: Commit**

```bash
git add DEPLOY.md
git commit -m "docs: add Hostinger deploy guide"
```

---

## Self-Review

**Spec coverage:**
- PHP backend under `public/api` → Tasks 1-5. ✓
- Contacto endpoint (JSON, required fields, honeypot, header guard) → Task 4. ✓
- Cotización endpoint (multipart, PDF guards: error/size/ext/MIME) → Task 5. ✓
- Single configurable recipient, Reply-To = visitor, SMTP from domain mailbox → Tasks 2-3. ✓
- `.htaccess` SPA fallback + protect config/lib → Task 6. ✓
- Frontend fetch wiring + honeypot + error state (Contacto/Cotización) → Tasks 7-8. ✓
- PDF file input + client pre-check → Task 8. ✓
- i18n ES+EN error/file strings → Tasks 7-8. ✓
- Secrets gitignored + example template → Task 2. ✓
- Local dev (Vite proxy + `php -S`) → Task 6. ✓
- Verification (unit tests, curl guards, manual) → Tasks 1-8. ✓
- Deploy checklist → Task 9. ✓

**Placeholder scan:** No TBD/TODO; every code step shows full content. ✓

**Type consistency:** `send_mail`/`build_message` option keys (`subject, htmlBody, textBody, replyToEmail, replyToName, attachments[{tmp_path,filename}]`) match across Tasks 3-5. `required`/`valid_email`/`clean`/`strip_headers`/`build_bodies`/`json_response`/`require_post` signatures consistent across all consumers. Endpoint response shape `{ok, error, fields?}` uniform. ✓

**Known deviation:** True TDD red/green applies to the PHP unit tests (Tasks 1-3) only. Endpoint success paths and frontend behavior are verified via curl guard-paths + lint/build + manual browser checks, because (a) success paths need live SMTP and (b) the repo has no JS test framework and adding one is out of scope.
