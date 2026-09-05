<?php

/**
 * Per-IP submission throttle backed by one small file per caller in the system
 * temp dir — no database, which keeps it usable on shared hosting.
 *
 * Fails OPEN: if the temp dir is unwritable we let the message through rather
 * than silently blocking real customers over an infrastructure problem.
 *
 * @return bool true if this request is allowed.
 */
function rate_limit(string $bucket, int $maxHits = 5, int $windowSeconds = 3600): bool {
    $ip   = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $file = sys_get_temp_dir() . '/rl_' . $bucket . '_' . md5($ip) . '.json';

    $fh = @fopen($file, 'c+');
    if ($fh === false) {
        return true;
    }
    if (!flock($fh, LOCK_EX)) {
        fclose($fh);
        return true;
    }

    $now     = time();
    $decoded = json_decode((string) stream_get_contents($fh), true);
    $hits    = [];
    if (is_array($decoded)) {
        foreach ($decoded as $t) {
            if (is_int($t) && $t > $now - $windowSeconds) {
                $hits[] = $t;
            }
        }
    }

    $allowed = count($hits) < $maxHits;
    if ($allowed) {
        $hits[] = $now;
    }

    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, json_encode($hits));
    fflush($fh);
    flock($fh, LOCK_UN);
    fclose($fh);

    return $allowed;
}
