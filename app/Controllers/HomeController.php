<?php
class HomeController {
    public function index() {
        // Dados para a view
        $projects = ['Projeto 1', 'Projeto 2', 'Projeto 3'];
        require_once "views/home.php";
    }
}
?>