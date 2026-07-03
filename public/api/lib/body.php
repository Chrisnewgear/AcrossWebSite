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
