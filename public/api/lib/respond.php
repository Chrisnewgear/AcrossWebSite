<?php

// These endpoints only ever emit JSON. A displayed PHP notice would both
// corrupt the body and fire "headers already sent", so route diagnostics to
// the server log instead — regardless of the host's php.ini defaults.
ini_set('display_errors', '0');
ini_set('log_errors', '1');

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
