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
