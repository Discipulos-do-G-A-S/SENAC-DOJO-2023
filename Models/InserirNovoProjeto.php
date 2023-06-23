<?php
class dadosProjetos
{
  private $nomeProjeto;
  private $cidadeProjeto;
  private $descricaoProjeto;
  private $objetivoProjeto;
  private $idCriador;
  private $opOds;
  private $partiner;
  private $chave_midia = null;

  public function __get($atributo)
  {
    return $this->$atributo;
  }
  public function __set($atributo, $valor)
  {
    $this->$atributo = $valor;
  }

  public function inserirProjeto() {
    include('conexao.php');
    $querry = "insert into projetos values (null,'" . $this->nomeProjeto . "','" . $this->cidadeProjeto . "','" . $this->descricaoProjeto . "','" . $this->objetivoProjeto . "','" . $this->chave_midia . "'," . $this->idCriador .");";
    $sql = mysqli_query($banco, $querry);
    $ultimo_id = mysqli_insert_id($banco);
    echo ('Projeto com id:'.$ultimo_id.' inserido com sucesso.');
    $totalOds = count($this->opOds);
    $totalPartiner = count($this->partiner);
     echo($totalOds.$totalPartiner) ;

     if ($totalOds > $totalPartiner) {
      for ($i = 0; $i < count($this->opOds); $i++) {
        for ($j = 0; $j < count($this->partiner); $j++) {
          $querryInsertOds = "insert into projetos_com_ods_parceiros values(" . $ultimo_id . "," . $this->opOds[$i] . "," . $this->partiner[$j] . ");";
          $sql2 = mysqli_query($banco, $querryInsertOds);
          echo ($sql2);
        }
      }
    }//if totalOds
    else if($totalOds < $totalPartiner){
      for ($i = 0; $i < count($this->partiner); $i++) {
        for ($j = 0; $j < count($this->opOds); $j++) {
          $querryInsertOds = "insert into projetos_com_ods_parceiros values(" . $ultimo_id . "," . $this->opOds[$j] . "," . $this->partiner[$i] . ");";
          $sql2 = mysqli_query($banco, $querryInsertOds);
          echo ($sql2);
        }
      }
    }
      else if ($totalOds == $totalPartiner){
        for ($i = 0; $i < count($this->partiner); $i++) 
        {
          $querryInsertOds = "insert into projetos_com_ods_parceiros values(" . $ultimo_id . "," . $this->opOds[$i] . "," . $this->partiner[$i] . ");";
          $sql2 = mysqli_query($banco, $querryInsertOds);
        }
      }// if totalPartiners
    if ($sql == false || !$sql2) {
      echo ('Erro no banco de dados' . mysqli_error($banco));
    }
  }    
} // classDadosProjeto
?>
