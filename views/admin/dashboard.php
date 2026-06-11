<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administración - Credencial Digital UTP</title>
    <link rel="stylesheet" href="../../assets/css/style.css">
    <link rel="stylesheet" href="../../assets/css/responsive.css">
    <link rel="stylesheet" href="../../assets/css/admin.css">
</head>
<body class="admin-page">
    <?php
    if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
        header('Location: ?route=login');
        exit;
    }
    require_once '../../config/bootstrap.php';
    $user = new \App\User\User();
    $total_students = $user->countStudents();
    $students = $user->getAllStudents(10, 0);
    ?>

    <nav class="navbar admin-navbar">
        <div class="container">
            <div class="navbar-brand">
                <span class="brand-text">Admin - Credencial Digital UTP</span>
            </div>
            <div class="navbar-menu">
                <span class="user-greeting">Admin: <?php echo htmlspecialchars($_SESSION['name']); ?></span>
                <a href="?route=logout" class="nav-link btn btn-secondary">Cerrar Sesión</a>
            </div>
        </div>
    </nav>

    <div class="admin-container">
        <aside class="admin-sidebar">
            <ul class="sidebar-menu">
                <li><a href="#dashboard" class="active">Dashboard</a></li>
                <li><a href="#students">Estudiantes</a></li>
                <li><a href="#credentials">Credenciales</a></li>
                <li><a href="#reports">Reportes</a></li>
            </ul>
        </aside>

        <main class="admin-content">
            <section id="dashboard" class="admin-section">
                <h2>Dashboard</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <h3><?php echo $total_students; ?></h3>
                        <p>Estudiantes Registrados</p>
                    </div>
                    <div class="stat-card">
                        <h3><?php echo rand(100, 500); ?></h3>
                        <p>Credenciales Generadas</p>
                    </div>
                    <div class="stat-card">
                        <h3><?php echo rand(50, 200); ?></h3>
                        <p>Validaciones Hoy</p>
                    </div>
                </div>
            </section>

            <section id="students" class="admin-section">
                <h2>Gestión de Estudiantes</h2>
                <div class="admin-toolbar">
                    <input type="text" id="search-students" placeholder="Buscar estudiante..." class="search-input">
                    <button class="btn btn-primary" onclick="exportarEstudiantes()">Exportar CSV</button>
                </div>
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Matrícula</th>
                            <th>Carrera</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($students as $student): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($student['id']); ?></td>
                                <td><?php echo htmlspecialchars($student['name']); ?></td>
                                <td><?php echo htmlspecialchars($student['student_id']); ?></td>
                                <td><?php echo htmlspecialchars($student['career']); ?></td>
                                <td><?php echo htmlspecialchars($student['email']); ?></td>
                                <td>
                                    <button class="btn btn-sm btn-info" onclick="verEstudiante(<?php echo $student['id']; ?>)">Ver</button>
                                    <button class="btn btn-sm btn-warning" onclick="editarEstudiante(<?php echo $student['id']; ?>)">Editar</button>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </section>
        </main>
    </div>

    <script src="../../assets/js/admin.js"></script>
</body>
</html>
