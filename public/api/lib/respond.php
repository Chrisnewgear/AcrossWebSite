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
