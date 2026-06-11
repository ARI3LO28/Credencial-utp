<?php
namespace App\Database;

class Connection
{
    private static $instance = null;
    private $pdo;

    private function __construct()
    {
        $host = getenv('DB_HOST') ?: 'localhost';
        $dbname = getenv('DB_NAME') ?: 'credencial_utp';
        $user = getenv('DB_USER') ?: 'root';
        $password = getenv('DB_PASSWORD') ?: '';
        $port = getenv('DB_PORT') ?: '3306';

        try {
            $this->pdo = new \PDO(
                "mysql:host=$host;port=$port;dbname=$dbname",
                $user,
                $password,
                [
                    \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
                    \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
                    \PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
                ]
            );
        } catch (\PDOException $e) {
            die('Error de conexión: ' . $e->getMessage());
        }
    }

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getPDO()
    {
        return $this->pdo;
    }
}
