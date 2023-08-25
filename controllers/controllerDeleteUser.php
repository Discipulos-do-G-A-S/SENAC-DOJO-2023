<?php
    include('../Models/deleteUser.php');
    $Dl = new DeleteUser;
    $id = $_GET['idUser'];
    $Dl ->deleteUser($id)
?>