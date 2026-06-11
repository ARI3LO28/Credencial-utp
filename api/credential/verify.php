<?php
require_once '../../config/bootstrap.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['code'])) {
    $credential = new \App\Credential\Credential();
    $result = $credential->verify($_POST['code']);
    
    if ($result) {
        echo json_encode([
            'success' => true,
            'data' => [
                'name' => $result['name'],
                'student_id' => $result['student_id'],
                'career' => $result['career'],
                'code' => $result['unique_code'],
                'expires_at' => $result['expires_at']
            ]
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Credencial no válida o expirada'
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Solicitud inválida'
    ]);
}
