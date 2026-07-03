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
