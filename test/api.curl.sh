#!/usr/bin/env bash
# Prereq (separate terminal): php -S localhost:8000 -t public
# Validation/guard paths return before send_mail, so no config.php/SMTP needed for these.
set -u
BASE=http://localhost:8000/api
code() { curl -s -o /dev/null -w "%{http_code}" "$@"; }

echo "contact GET -> expect 405:            $(code $BASE/contact.php)"
echo "contact empty body -> expect 422:     $(code -X POST $BASE/contact.php -H 'Content-Type: application/json' -d '{}')"
echo "contact honeypot -> expect 200:       $(code -X POST $BASE/contact.php -H 'Content-Type: application/json' -d '{"nombre_confirmacion":"bot","nombre":"x","email":"a@b.com","asunto":"y","mensaje":"z"}')"
echo "contact legacy honeypot -> expect 200:$(code -X POST $BASE/contact.php -H 'Content-Type: application/json' -d '{"website":"bot","nombre":"x","email":"a@b.com","asunto":"y","mensaje":"z"}')"
echo "contact bad email -> expect 422:      $(code -X POST $BASE/contact.php -H 'Content-Type: application/json' -d '{"nombre":"x","email":"nope","asunto":"y","mensaje":"z"}')"
echo "contact long message -> expect 422:   $(code -X POST $BASE/contact.php -H 'Content-Type: application/json' -d "{\"nombre\":\"x\",\"email\":\"a@b.com\",\"asunto\":\"y\",\"mensaje\":\"$(head -c 5001 /dev/zero | tr '\0' 'a')\"}")"

echo "cotizacion GET -> expect 405:         $(code $BASE/cotizacion.php)"
echo "cotizacion missing -> expect 422:     $(code -X POST $BASE/cotizacion.php -F 'nombre=x')"
printf '%%PDF-1.4 real' > /tmp/real.pdf
printf 'not a pdf'      > /tmp/fake.pdf
echo "cotizacion non-pdf mime -> expect 422:$(code -X POST $BASE/cotizacion.php -F 'service=Maritimo' -F 'origen=A' -F 'destino=B' -F 'nombre=x' -F 'email=a@b.com' -F 'documento=@/tmp/fake.pdf;type=application/pdf')"
echo "cotizacion honeypot -> expect 200:    $(code -X POST $BASE/cotizacion.php -F 'nombre_confirmacion=bot' -F 'service=Maritimo' -F 'origen=A' -F 'destino=B' -F 'nombre=x' -F 'email=a@b.com')"

# Run last: it fills the contact bucket (5/hour per IP). Only requests that
# reach the send step count, so these payloads must be valid. Attempts 1-5 are
# 500 without config.php (200 with it); attempt 6 must be 429.
echo "contact rate limit -> attempts 1-5 pass, #6 must be 429:"
for i in 1 2 3 4 5 6; do
  printf '  attempt %s: %s\n' "$i" "$(code -X POST $BASE/contact.php -H 'Content-Type: application/json' -d '{"nombre":"x","email":"a@b.com","asunto":"y","mensaje":"z"}')"
done
echo "  (reset with: rm -f \${TMPDIR:-/tmp}/rl_contact_*.json)"
