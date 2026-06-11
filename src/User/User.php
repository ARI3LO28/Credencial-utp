<?php
namespace App\User;

use App\Database\Connection;

class User
{
    private $pdo;

    public function __construct()
    {
        $this->pdo = Connection::getInstance()->getPDO();
    }

    public function getById($id)
    {
        $stmt = $this->pdo->prepare(
            'SELECT id, email, name, student_id, career, photo, role, created_at FROM users WHERE id = ?'
        );
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    public function update($id, $data)
    {
        $fields = [];
        $values = [];
        
        foreach ($data as $key => $value) {
            if (in_array($key, ['name', 'career', 'student_id', 'photo'])) {
                $fields[] = "$key = ?";
                $values[] = $value;
            }
        }
        
        $values[] = $id;
        $stmt = $this->pdo->prepare('UPDATE users SET ' . implode(', ', $fields) . ' WHERE id = ?');
        return $stmt->execute($values);
    }

    public function search($query)
    {
        $stmt = $this->pdo->prepare(
            'SELECT id, email, name, student_id, career FROM users WHERE (name LIKE ? OR student_id LIKE ? OR email LIKE ?) AND role = "student" LIMIT 50'
        );
        $searchTerm = '%' . $query . '%';
        $stmt->execute([$searchTerm, $searchTerm, $searchTerm]);
        return $stmt->fetchAll();
    }

    public function getAllStudents($limit = 100, $offset = 0)
    {
        $stmt = $this->pdo->prepare(
            'SELECT id, email, name, student_id, career, photo, created_at FROM users WHERE role = "student" LIMIT ? OFFSET ?'
        );
        $stmt->execute([$limit, $offset]);
        return $stmt->fetchAll();
    }

    public function countStudents()
    {
        $stmt = $this->pdo->query('SELECT COUNT(*) as count FROM users WHERE role = "student"');
        $result = $stmt->fetch();
        return $result['count'];
    }
}
