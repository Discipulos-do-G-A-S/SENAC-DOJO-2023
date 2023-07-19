<?php
    include('../Models/deleteProject.php');
    $Dl = new DeleteProject;
    $id = $_POST['idProjeto'];
    $Dl ->deleteProject($id)
?>