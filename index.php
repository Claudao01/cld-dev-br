<?php
// Roteamento simples
$controller = $_GET['controller'] ?? 'home';
$action = $_GET['action'] ?? 'index';

// Carrega o controller
$controllerClass = ucfirst($controller) . 'Controller';
require_once "app/Controllers/$controllerClass.php";

$controllerInstance = new $controllerClass();
$controllerInstance->$action();
?>