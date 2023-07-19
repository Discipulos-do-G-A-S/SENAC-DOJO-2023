<?php
 class DeleteProject
 {
    private $idProject;
    public function __get($atributo)
   {
     return $this->$atributo;
   }
 
   public function __set($atributo, $valor)
   {
     $this->$atributo = $valor;
   }
   public function deleteProject($id)
   {
    include('connection.php');
    $query = "delete from projetos where id_projeto=".$id;
    $sql1 = mysqli_query($banco, $query);
    //$query2 = "delete from projetos_com_ods_parceiros where projeto_id=".$id;
    //$sql2 =  mysqli_query($banco, $query2);
    if(!$sql1)
    {
        echo("erro ao deletar Projeto" . mysqli_error($banco));
    }
   // if(!$sql2)
   // {
        echo("erro ao deletar dados da segunda tabela" . mysqli_error($banco));
   // }
   // else
   // {
   //     echo("projeto excluido com sucesso");
   // }
   }
 }// class
?>