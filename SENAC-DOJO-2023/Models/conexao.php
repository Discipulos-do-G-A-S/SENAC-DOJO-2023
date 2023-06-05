<?php
$conection = 'localhost';
$user = 'root';
$password = '';
$database= 'db_projetos_somar';
$banco = mysqli_connect($conection, $user, $password, $database) or die("Não foi possível conexão com BD.");
if (!$banco) {
    echo ("Causa do erro:" .mysqli_connect_error());}
?>