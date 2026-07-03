<?php
require __DIR__ . '/../public/api/lib/validate.php';
require __DIR__ . '/../public/api/lib/mailer.php';

$cfg = [
    'RECIPIENT' => 'to@acrosscon.com', 'MAIL_FROM' => 'from@acrosscon.com',
    'MAIL_FROM_NAME' => 'Across', 'SMTP_HOST' => 'localhost', 'SMTP_PORT' => 465,
    'SMTP_USER' => 'u', 'SMTP_PASS' => 'p', 'MAX_FILE_MB' => 10,
];

$tmp = tempnam(sys_get_temp_dir(), 'pdf');
file_put_contents($tmp, "%PDF-1.4 test");

$mail = new PHPMailer\PHPMailer\PHPMailer(true);
build_message($mail, [
    'subject' => "Hi\r\nInjected", 'htmlBody' => '<p>x</p>', 'textBody' => 'x',
    'replyToEmail' => 'client@x.com', 'replyToName' => 'Client',
    'attachments' => [['tmp_path' => $tmp, 'filename' => 'doc.pdf']],
], $cfg);
$mail->preSend();
$mime = $mail->getSentMIMEMessage();

$fails = 0;
function check($c, $m) {
    global $fails;
    if (!$c) { $fails++; echo "FAIL: $m\n"; } else { echo "ok: $m\n"; }
}

check(strpos($mime, 'Subject: HiInjected') !== false, 'subject set, header injection stripped');
check(strpos($mime, 'client@x.com') !== false, 'reply-to set');
check(strpos($mime, 'doc.pdf') !== false, 'attachment present');
check(strpos($mime, 'to@acrosscon.com') !== false, 'recipient set');

echo $fails === 0 ? "\nALL PASS\n" : "\n$fails FAILURES\n";
exit($fails === 0 ? 0 : 1);
