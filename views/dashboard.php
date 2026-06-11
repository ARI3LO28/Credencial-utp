<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Panel - Credencial Digital UTP</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/responsive.css">
</head>
<body class="dashboard-page">
    <?php
    if (!isset($_SESSION['user_id'])) {
        header('Location: ?route=login');
        exit;
    }
    require_once '../config/bootstrap.php';
    $user = new \App\User\User();
    $credential = new \App\Credential\Credential();
    $userData = $user->getById($_SESSION['user_id']);
    $credentialData = $credential->getByUserId($_SESSION['user_id']);
    ?>

    <nav class="navbar">
        <div class="container">
            <div class="navbar-brand">
                <span class="brand-text">Credencial Digital UTP</span>
            </div>
            <div class="navbar-menu">
                <span class="user-greeting">Bienvenido, <?php echo htmlspecialchars($_SESSION['name']); ?></span>
                <a href="?route=logout" class="nav-link btn btn-secondary">Cerrar Sesión</a>
            </div>
        </div>
    </nav>

    <div class="container dashboard-container">
        <div class="dashboard-grid">
            <!-- Información del Usuario -->
            <section class="dashboard-section">
                <h2>Mi Información</h2>
                <div class="user-info">
                    <p><strong>Nombre:</strong> <?php echo htmlspecialchars($userData['name']); ?></p>
                    <p><strong>Matrícula:</strong> <?php echo htmlspecialchars($userData['student_id']); ?></p>
                    <p><strong>Carrera:</strong> <?php echo htmlspecialchars($userData['career']); ?></p>
                    <p><strong>Email:</strong> <?php echo htmlspecialchars($userData['email']); ?></p>
                </div>
            </section>

            <!-- Credencial -->
            <section class="dashboard-section">
                <h2>Mi Credencial</h2>
                <?php if ($credentialData): ?>
                    <div class="credential-display">
                        <div class="credential-qr">
                            <img src="<?php echo htmlspecialchars($credentialData['qr_code']); ?>" alt="Código QR">
                        </div>
                        <div class="credential-info">
                            <p><strong>Código:</strong> <?php echo htmlspecialchars($credentialData['unique_code']); ?></p>
                            <p><strong>Generada:</strong> <?php echo date('d/m/Y H:i', strtotime($credentialData['generated_at'])); ?></p>
                            <p><strong>Vence:</strong> <?php echo date('d/m/Y', strtotime($credentialData['expires_at'])); ?></p>
                            <p><strong>Estado:</strong> <span class="badge badge-success">Activa</span></p>
                        </div>
                    </div>
                    <button onclick="descargarCredencial()" class="btn btn-primary">Descargar Credencial</button>
                <?php else: ?>
                    <p>No tienes credencial generada aún.</p>
                    <form method="POST" action="../api/credential/generate.php" class="mt-3">
                        <button type="submit" class="btn btn-primary">Generar Credencial</button>
                    </form>
                <?php endif; ?>
            </section>
        </div>
    </div>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Universidad Tecnológica de Puebla</p>
        </div>
    </footer>

    <script>
        function descargarCredencial() {
            alert('Descarga de credencial (pendiente de implementación)');
        }
    </script>
</body>
</html>
