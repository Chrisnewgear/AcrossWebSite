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
