#!/usr/bin/env bash
# Prereq (separate terminal): php -S localhost:8000 -t public
# Validation/guard paths return before send_mail, so no config.php/SMTP needed for these.
set -u
BASE=http://localhost:8000/api
code() { curl -s -o /dev/null -w "%{http_code}" "$@"; }

echo "contact GET -> expect 405:            $(code $BASE/contact.php)"
echo "contact empty body -> expect 422:     $(code -X POST $BASE/contact.php -H 'Content-Type: application/json' -d '{}')"
echo "contact honeypot -> expect 200:       $(code -X POST $BASE/contact.php -H 'Content-Type: application/json' -d '{"website":"bot","nombre":"x","email":"a@b.com","asunto":"y","mensaje":"z"}')"
echo "contact bad email -> expect 422:      $(code -X POST $BASE/contact.php -H 'Content-Type: application/json' -d '{"nombre":"x","email":"nope","asunto":"y","mensaje":"z"}')"
