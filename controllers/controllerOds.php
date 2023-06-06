<?php
 include('../Models/listarprojetos.php');
    $lp = new listarOds;
    $lp -> ods = $_GET['valor'];
    $lp ->listardados();
?>