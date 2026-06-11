<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrarse - Credencial Digital UTP</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/responsive.css">
</head>
<body class="auth-page">
    <div class="auth-container">
        <div class="auth-box auth-box-lg">
            <div class="auth-header">
                <h1>Crear Cuenta</h1>
            </div>

            <?php
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                require_once '../config/bootstrap.php';
                $auth = new \App\Auth\Auth();
                $result = $auth->register(
                    $_POST['email'],
                    $_POST['password'],
                    $_POST['name'],
                    $_POST['student_id'],
                    $_POST['career']
                );
                
                if ($result['success']) {
                    echo '<div class="alert alert-success">Registro exitoso. <a href="?route=login">Inicia sesión</a></div>';
                } else {
                    echo '<div class="alert alert-error">' . htmlspecialchars($result['message']) . '</div>';
                }
            }
            ?>

            <form method="POST" class="auth-form">
                <div class="form-group">
                    <label for="name">Nombre Completo</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Correo Electrónico</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="student_id">Matrícula</label>
                    <input type="text" id="student_id" name="student_id" required>
                </div>
                <div class="form-group">
                    <label for="career">Carrera</label>
                    <select id="career" name="career" required>
                        <option value="">Selecciona una carrera</option>
                        <option value="Ingeniería en Sistemas Computacionales">Ingeniería en Sistemas Computacionales</option>
                        <option value="Ingeniería en Electrónica">Ingeniería en Electrónica</option>
                        <option value="Ingeniería Mecánica">Ingeniería Mecánica</option>
                        <option value="Ingeniería en Gestión Empresarial">Ingeniería en Gestión Empresarial</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Crear Cuenta</button>
            </form>

            <p class="auth-footer">
                ¿Ya tienes cuenta? <a href="?route=login">Inicia sesión</a>
            </p>
        </div>
    </div>
</body>
</html>
