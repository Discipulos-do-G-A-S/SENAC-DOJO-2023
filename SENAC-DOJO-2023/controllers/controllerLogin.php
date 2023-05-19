<?php
include('../Models/login.php');
$Dl = new dadosLogin;
$Dl -> cpf = $_POST['cpf'] ;
$Dl -> password = $_POST['senha'];
$Dl ->validarLogin();
?>