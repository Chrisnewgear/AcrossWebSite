<?php
use PHPMailer\PHPMailer\PHPMailer;

require_once __DIR__ . '/validate.php';
require_once __DIR__ . '/PHPMailer/Exception.php';
require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';

function load_config(): array {
    $path = __DIR__ . '/../config.php';
    if (!file_exists($path)) {
        throw new RuntimeException('Missing config.php');
    }
    return require $path;
}

/** Configure a PHPMailer instance from options + config. No network I/O. */
function build_message(PHPMailer $mail, array $opts, array $cfg): void {
    $mail->isSMTP();
    $mail->Host       = $cfg['SMTP_HOST'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $cfg['SMTP_USER'];
    $mail->Password   = $cfg['SMTP_PASS'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = (int) $cfg['SMTP_PORT'];
    $mail->CharSet    = 'UTF-8';
    // PHPMailer defaults to 300s. A blocked SMTP port would otherwise leave the
    // visitor watching a spinner for five minutes before the request gives up.
    $mail->Timeout    = 15;

    $mail->setFrom($cfg['MAIL_FROM'], $cfg['MAIL_FROM_NAME']);
    $mail->addAddress($cfg['RECIPIENT']);
    if (!empty($opts['replyToEmail'])) {
        $mail->addReplyTo(strip_headers($opts['replyToEmail']), strip_headers($opts['replyToName'] ?? ''));
    }
    foreach ($opts['attachments'] ?? [] as $att) {
        $mail->addAttachment($att['tmp_path'], $att['filename']);
    }
    $mail->isHTML(true);
    $mail->Subject = strip_headers($opts['subject']);
    $mail->Body    = $opts['htmlBody'];
    $mail->AltBody = $opts['textBody'];
}

function send_mail(array $opts): void {
    $cfg  = load_config();
    $mail = new PHPMailer(true);
    build_message($mail, $opts, $cfg);
    $mail->send();
}
