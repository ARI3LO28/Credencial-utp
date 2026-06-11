<?php
namespace App\Auth;

use App\Database\Connection;

class Auth
{
    private $pdo;

    public function __construct()
    {
        $this->pdo = Connection::getInstance()->getPDO();
    }

    public function register($email, $password, $name, $student_id, $career)
    {
        $stmt = $this->pdo->prepare('SELECT id FROM users WHERE email = ?');
        $stmt->execute([$email]);
        if ($stmt->rowCount() > 0) {
            return ['success' => false, 'message' => 'El email ya está registrado'];
        }

        $hashed_password = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $this->pdo->prepare(
            'INSERT INTO users (email, password, name, student_id, career, role, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())'
        );
        
        if ($stmt->execute([$email, $hashed_password, $name, $student_id, $career, 'student'])) {
            return ['success' => true, 'message' => 'Registro exitoso'];
        }
        return ['success' => false, 'message' => 'Error al registrar'];
    }

    public function login($email, $password)
    {
        $stmt = $this->pdo->prepare('SELECT id, email, password, name, role FROM users WHERE email = ?');
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['name'] = $user['name'];
            $_SESSION['role'] = $user['role'];
            return ['success' => true, 'message' => 'Inicio de sesión exitoso'];
        }
        return ['success' => false, 'message' => 'Email o contraseña incorrectos'];
    }

    public function isLoggedIn()
    {
        return isset($_SESSION['user_id']);
    }

    public function isAdmin()
    {
        return isset($_SESSION['role']) && $_SESSION['role'] === 'admin';
    }
}
