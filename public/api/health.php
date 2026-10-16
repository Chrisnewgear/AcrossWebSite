<?php
/**
 * Deployment self-check. Visit /api/health.php after uploading to confirm the
 * server can actually send mail, instead of discovering it from a customer.
 *
 *   /api/health.php           config + environment only (no network I/O)
 *   /api/health.php?smtp=1    additionally opens an authenticated SMTP session
 *                             (connect + AUTH + quit — sends no mail)
 *
 * Reports key NAMES and booleans only, never credential values.
 * Delete this file once the deployment is verified — see DEPLOY.md.
 */
require_once __DIR__ . '/lib/respond.php';
require_once __DIR__ . '/lib/mailer.php';
require_once __DIR__ . '/lib/ratelimit.php';

const REQUIRED_KEYS = [
    'RECIPIENT', 'MAIL_FROM', 'MAIL_FROM_NAME',
    'SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS',
];

$report = [
    'ok'          => false,
    'php'         => PHP_VERSION,
    'extensions'  => [
        'openssl'  => extension_loaded('openssl'),   // required for SMTPS :465
        'mbstring' => extension_loaded('mbstring'),
        'fileinfo' => extension_loaded('fileinfo'),  // quote attachment checks
    ],
    'config'      => ['present' => false, 'missing_keys' => [], 'placeholders' => []],
    'post_max_size' => ini_get('post_max_size'),
    'upload_max_filesize' => ini_get('upload_max_filesize'),
];

$cfg = [];
try {
    $cfg = load_config();
    $report['config']['present'] = true;

    foreach (REQUIRED_KEYS as $key) {
        if (!isset($cfg[$key]) || $cfg[$key] === '') {
            $report['config']['missing_keys'][] = $key;
        } elseif ($cfg[$key] === 'CHANGE_ME') {
            $report['config']['placeholders'][] = $key;
        }
    }

    // Shape checks for the usual causes of a 535 with a password that works in
    // webmail: a pasted space, a non-ASCII lookalike character, or a username
    // that is not the mailbox address. Booleans only — no values.
    $user = (string) ($cfg['SMTP_USER'] ?? '');
    $pass = (string) ($cfg['SMTP_PASS'] ?? '');
    $report['config']['checks'] = [
        'smtp_user_is_email'        => filter_var($user, FILTER_VALIDATE_EMAIL) !== false,
        'smtp_user_edge_whitespace' => $user !== trim($user),
        'smtp_pass_edge_whitespace' => $pass !== trim($pass),
        'smtp_pass_non_ascii'       => (bool) preg_match('/[^\x20-\x7E]/', $pass),
        'mail_from_equals_user'     => strcasecmp((string) ($cfg['MAIL_FROM'] ?? ''), $user) === 0,
    ];
} catch (Throwable $e) {
    $report['hint'] = 'Copy api/config.example.php to api/config.php and fill it in.';
    json_response(500, $report);
}

$configOk = !$report['config']['missing_keys'] && !$report['config']['placeholders'];

if (isset($_GET['smtp']) && $configOk) {
    if (!rate_limit('health', 10, 3600)) {
        json_response(429, ['ok' => false, 'error' => 'Too many requests']);
    }
    try {
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        // Also validates MAIL_FROM / RECIPIENT — both throw here if malformed.
        build_message($mail, ['subject' => 'health', 'htmlBody' => '', 'textBody' => ''], $cfg);
        // Keep the server's own rejection lines (e.g. "535 5.7.139 ..."): they
        // say why AUTH failed. Client lines are dropped — they carry the
        // base64 credentials.
        $mail->SMTPDebug   = 2;
        $mail->Debugoutput = function ($line) use (&$report) {
            if (preg_match('/^SERVER -> CLIENT: ([45]\d\d[ -].*)/s', $line, $m)) {
                $report['smtp_server_said'][] = trim($m[1]);
            }
        };
        $mail->smtpConnect();
        $mail->smtpClose();
        $report['smtp'] = ['ok' => true];
    } catch (Throwable $e) {
        $report['smtp'] = ['ok' => false, 'error' => $e->getMessage()];
    }
    // Which handshake was attempted, and whether the port is reachable at all.
    // A failed raw connect means the host blocks outbound SMTP — no config
    // change fixes that; a successful one points at TLS or credentials.
    $report['smtp']['encryption'] = $mail->SMTPSecure;
    $sock = @fsockopen($cfg['SMTP_HOST'], (int) $cfg['SMTP_PORT'], $errno, $errstr, 10);
    $report['smtp']['tcp'] = $sock
        ? ['ok' => true]
        : ['ok' => false, 'errno' => $errno, 'error' => $errstr];
    if ($sock) {
        fclose($sock);
    }
}

$report['ok'] = $configOk
    && $report['extensions']['openssl']
    && $report['extensions']['mbstring']
    && (!isset($report['smtp']) || $report['smtp']['ok']);

json_response($report['ok'] ? 200 : 500, $report);
