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
