<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión - Credencial Digital UTP</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/responsive.css">
</head>
<body class="auth-page">
    <div class="auth-container">
        <div class="auth-box">
            <div class="auth-header">
                <h1>Iniciar Sesión</h1>
            </div>

            <?php
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                require_once '../config/bootstrap.php';
                $auth = new \App\Auth\Auth();
                $result = $auth->login($_POST['email'], $_POST['password']);
                
                if ($result['success']) {
                    header('Location: ?route=dashboard');
                    exit;
                } else {
                    echo '<div class="alert alert-error">' . htmlspecialchars($result['message']) . '</div>';
                }
            }
            ?>

            <form method="POST" class="auth-form">
                <div class="form-group">
                    <label for="email">Correo Electrónico</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Ingresar</button>
            </form>

            <p class="auth-footer">
                ¿No tienes cuenta? <a href="?route=register">Regístrate aquí</a>
            </p>
        </div>
    </div>
</body>
</html>
