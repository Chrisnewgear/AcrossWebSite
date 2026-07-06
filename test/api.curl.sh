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

echo "cotizacion GET -> expect 405:         $(code $BASE/cotizacion.php)"
echo "cotizacion missing -> expect 422:     $(code -X POST $BASE/cotizacion.php -F 'nombre=x')"
printf '%%PDF-1.4 real' > /tmp/real.pdf
printf 'not a pdf'      > /tmp/fake.pdf
echo "cotizacion non-pdf mime -> expect 422:$(code -X POST $BASE/cotizacion.php -F 'service=Maritimo' -F 'origen=A' -F 'destino=B' -F 'nombre=x' -F 'email=a@b.com' -F 'documento=@/tmp/fake.pdf;type=application/pdf')"
echo "cotizacion honeypot -> expect 200:    $(code -X POST $BASE/cotizacion.php -F 'website=bot' -F 'service=Maritimo' -F 'origen=A' -F 'destino=B' -F 'nombre=x' -F 'email=a@b.com')"
