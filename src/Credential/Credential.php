<?php
namespace App\Credential;

use App\Database\Connection;

class Credential
{
    private $pdo;

    public function __construct()
    {
        $this->pdo = Connection::getInstance()->getPDO();
    }

    public function create($user_id, $qr_code)
    {
        $unique_code = 'CRED-' . strtoupper(substr(md5(time() . $user_id), 0, 8));
        
        $stmt = $this->pdo->prepare(
            'INSERT INTO credentials (user_id, unique_code, qr_code, generated_at, expires_at, is_active) VALUES (?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 4 YEAR), 1)'
        );
        
        if ($stmt->execute([$user_id, $unique_code, $qr_code])) {
            return [
                'success' => true,
                'credential_id' => $this->pdo->lastInsertId(),
                'unique_code' => $unique_code
            ];
        }
        return ['success' => false, 'message' => 'Error al crear credencial'];
    }

    public function getByUserId($user_id)
    {
        $stmt = $this->pdo->prepare(
            'SELECT id, user_id, unique_code, qr_code, generated_at, expires_at, is_active FROM credentials WHERE user_id = ? ORDER BY generated_at DESC LIMIT 1'
        );
        $stmt->execute([$user_id]);
        return $stmt->fetch();
    }

    public function verify($unique_code)
    {
        $stmt = $this->pdo->prepare(
            'SELECT c.id, c.user_id, c.unique_code, u.name, u.student_id, u.career, u.photo, c.is_active, c.expires_at FROM credentials c JOIN users u ON c.user_id = u.id WHERE c.unique_code = ? AND c.is_active = 1'
        );
        $stmt->execute([$unique_code]);
        $credential = $stmt->fetch();
        
        if ($credential) {
            if (strtotime($credential['expires_at']) > time()) {
                return $credential;
            }
        }
        return null;
    }
}
