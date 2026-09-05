<?php
require __DIR__ . '/../public/api/lib/ratelimit.php';

$_SERVER['REMOTE_ADDR'] = '203.0.113.7'; // TEST-NET-3, never a real caller
$bucket = 'unittest';
$file = sys_get_temp_dir() . '/rl_' . $bucket . '_' . md5($_SERVER['REMOTE_ADDR']) . '.json';

$fails = 0;
function check($c, $m) {
    global $fails;
    if (!$c) { $fails++; echo "FAIL: $m\n"; } else { echo "ok: $m\n"; }
}

// --- allows up to the cap, then blocks -------------------------------------
@unlink($file);
check(rate_limit($bucket, 3, 3600) === true,  'hit 1 of 3 allowed');
check(rate_limit($bucket, 3, 3600) === true,  'hit 2 of 3 allowed');
check(rate_limit($bucket, 3, 3600) === true,  'hit 3 of 3 allowed');
check(rate_limit($bucket, 3, 3600) === false, 'hit 4 blocked');
check(rate_limit($bucket, 3, 3600) === false, 'still blocked after the cap');

// A blocked request must not extend the window by recording itself.
$hits = json_decode((string) file_get_contents($file), true);
check(count($hits) === 3, 'blocked hits are not recorded');

// --- entries older than the window are forgotten ---------------------------
@unlink($file);
file_put_contents($file, json_encode([time() - 7200, time() - 5400, time() - 4000]));
check(rate_limit($bucket, 3, 3600) === true, 'hits outside the window expire');

// --- buckets are independent ----------------------------------------------
@unlink($file);
$other = sys_get_temp_dir() . '/rl_other_' . md5($_SERVER['REMOTE_ADDR']) . '.json';
@unlink($other);
rate_limit($bucket, 1, 3600);
check(rate_limit($bucket, 1, 3600) === false, 'first bucket exhausted');
check(rate_limit('other', 1, 3600) === true,  'second bucket unaffected');

// --- callers are tracked separately ---------------------------------------
$_SERVER['REMOTE_ADDR'] = '203.0.113.8';
$otherIpFile = sys_get_temp_dir() . '/rl_' . $bucket . '_' . md5('203.0.113.8') . '.json';
@unlink($otherIpFile);
check(rate_limit($bucket, 1, 3600) === true, 'a different IP gets its own budget');

// --- corrupt state must not block real mail --------------------------------
$_SERVER['REMOTE_ADDR'] = '203.0.113.9';
$corrupt = sys_get_temp_dir() . '/rl_' . $bucket . '_' . md5('203.0.113.9') . '.json';
file_put_contents($corrupt, 'not json at all');
check(rate_limit($bucket, 3, 3600) === true, 'unparseable state fails open');

foreach ([$file, $other, $otherIpFile, $corrupt] as $f) { @unlink($f); }

echo $fails === 0 ? "\nALL PASS\n" : "\n$fails FAILURES\n";
exit($fails === 0 ? 0 : 1);
