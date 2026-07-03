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
