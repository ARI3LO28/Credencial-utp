<?php
require_once '../../config/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SESSION['user_id'])) {
    $credential = new \App\Credential\Credential();
    $qr = new \App\QR\QRGenerator();
    
    $qr_code = $qr->generate($_SESSION['user_id'] . '-' . time());
    $result = $credential->create($_SESSION['user_id'], $qr_code);
    
    if ($result['success']) {
        header('Location: ../../public/index.php?route=dashboard&success=credential_created');
    } else {
        header('Location: ../../public/index.php?route=dashboard&error=credential_failed');
    }
} else {
    header('Location: ../../public/index.php?route=login');
}
