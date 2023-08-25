<?php
 class DeleteUser
 {
   public function __set($atributo, $valor)
   {
     $this->$atributo = $valor;
   }
   public function deleteUser($id)
   {
    include('connection.php');
    $query = "DELETE FROM users WHERE id_user=$id;";
    $sql = mysqli_query($banco, $query);
    if(!$sql)
    {
        echo("erro ao deletar dados da tabela users" . mysqli_error($banco));
    }
   }
 }// class
?>