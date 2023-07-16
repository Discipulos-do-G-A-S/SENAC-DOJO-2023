<?php
class EditProjec
{
   private  $idProject;
   private $nameProject;
   private $cityProject;
   private $descriptionProject;
   private $objectProject;

   public function __get($atributo)
   {
     return $this->$atributo;
   }
 
   public function __set($atributo, $valor)
   {
     $this->$atributo = $valor;
   }
   
    public function editProject()
    {
        include('connection.php');
        $query = "UPDATE projetos SET nome_projeto = '$this->nameProject', cidade_projeto = '$this->cityProject', descricao_projeto = '$this->descriptionProject', objetivo_projeto = '$this->objectProject' WHERE id_projeto = $this->idProject";
        $sql = mysqli_query($banco, $query);
        if(!$sql)
        {
            echo ('Erro no banco de dados: ' . mysqli_error($banco));
        }
        else
        {
            echo('Projeto editado com sucesso');
        }
    }
}// class
?>