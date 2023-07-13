<?php
 include('../Models/listarprojetos.php');
    $lp = new listarOds;
    $ods = $_GET['ods'];
    $lp ->listarAllFromODS($ods);
?>