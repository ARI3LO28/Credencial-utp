<?php
namespace App\QR;

class QRGenerator
{
    public static function generate($data, $size = 300)
    {
        $qr_data = urlencode($data);
        $qr_url = "https://api.qrserver.com/v1/create-qr-code/?size={$size}x{$size}&data={$qr_data}";
        return $qr_url;
    }

    public static function generateAndSave($data, $filename)
    {
        $qr_url = self::generate($data);
        $qr_image = file_get_contents($qr_url);
        
        $filepath = UPLOADS_PATH . '/qr_codes/' . $filename . '.png';
        if (!is_dir(UPLOADS_PATH . '/qr_codes/')) {
            mkdir(UPLOADS_PATH . '/qr_codes/', 0755, true);
        }
        
        file_put_contents($filepath, $qr_image);
        return $filepath;
    }
}
