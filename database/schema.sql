CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `student_id` VARCHAR(50) UNIQUE NOT NULL,
  `career` VARCHAR(255) NOT NULL,
  `photo` LONGBLOB,
  `role` ENUM('student', 'admin', 'staff') DEFAULT 'student',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_email` (`email`),
  INDEX `idx_student_id` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `credentials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `unique_code` VARCHAR(50) UNIQUE NOT NULL,
  `qr_code` LONGBLOB,
  `generated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `expires_at` TIMESTAMP,
  `is_active` BOOLEAN DEFAULT 1,
  `last_verified_at` TIMESTAMP NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX `idx_unique_code` (`unique_code`),
  INDEX `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `credential_verifications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `credential_id` INT NOT NULL,
  `verified_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `verified_by` INT,
  `verification_method` VARCHAR(50),
  FOREIGN KEY (`credential_id`) REFERENCES `credentials`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`verified_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
