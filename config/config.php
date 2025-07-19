<?php
/**
 * Application Configuration
 */

// Start session
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Define constants
define('BASE_URL', 'http://localhost/tourism-website/');
define('ADMIN_URL', BASE_URL . 'admin/');
define('UPLOAD_PATH', 'uploads/');

// Include database configuration
require_once 'database.php';

// Autoload classes
spl_autoload_register(function ($class_name) {
    $directories = [
        'models/',
        'controllers/',
        'helpers/'
    ];
    
    foreach ($directories as $directory) {
        $file = $directory . $class_name . '.php';
        if (file_exists($file)) {
            require_once $file;
            return;
        }
    }
});

// CSRF Protection
function generateCSRFToken() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function validateCSRFToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

// Security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
?>