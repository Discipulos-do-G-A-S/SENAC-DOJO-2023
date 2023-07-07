<?php
class dadosProjetos
{
  private $nomeProjeto;
  private $cidadeProjeto;
  private $descricaoProjeto;
  private $objetivoProjeto;
  private $idCriador;
  private $opOds = [];
  private $partiner = [];
  private $chave_midia = null;

  public function __get($atributo)
  {
    return $this->$atributo;
  }

  public function __set($atributo, $valor)
  {
    $this->$atributo = $valor;
  }

  public function inserirProjeto()
  {
    include('conexao.php');
    $querry = "insert into projetos values (null,'" . $this->nomeProjeto . "','" . $this->cidadeProjeto . "','" . $this->descricaoProjeto . "','" . $this->objetivoProjeto . "','" . $this->chave_midia . "'," . $this->idCriador . ");";
    $sql = mysqli_query($banco, $querry);
    if (!$sql) {
      echo ('erro no banco de dados ' . mysqli_error($banco));
    }
    $ultimo_id = mysqli_insert_id($banco);
    echo ('Projeto com id: ' . $ultimo_id . ' inserido com sucesso.');

    $totalOds = count($this->opOds);
    $totalPartiner = count($this->partiner);

    echo ("Total de Ods: " . $totalOds);
    echo ("<br>");
    echo ("Total de Patrocinadores: " . $totalPartiner);
    echo ("<br>");
    echo("===========================================================");
    if ($totalOds > $totalPartiner) {
      for ($i = 0; $i < count($this->opOds); $i++) {
       
        if ($totalPartiner === 0 || $i > $totalPartiner) {
          
          $querryInsertOds = "insert into projetos_com_ods_parceiros values(" . $ultimo_id . "," . $this->opOds[$i] . ",null);";
          $sql2 = mysqli_query($banco, $querryInsertOds);
          if (!$sql2) {
            echo ('erro no banco de dados ' . mysqli_error($banco));
          }
        } else {
          $  = "insert into projetos_com_ods_parceiros values(" . $ultimo_id . "," . $this->opOds[$i] . "," . $this->partiner[$i] . ");";
          $sql2 = mysqli_query($banco, $querryInsertOds);
          if (!$sql2) {
            echo ('erro no banco de dados ' . mysqli_error($banco));
          }
        }
      }
    } else if ($totalOds < $totalPartiner) {
      for ($i = 0; $i < count($this->partiner); $i++) {
        if ($totalOds === 0 || $i >= $totalOds) {
          $querryInsertOds = "insert into projetos_com_ods_parceiros values(" . $ultimo_id . ",null," . $this->partiner[$i] . ");";
          $sql2 = mysqli_query($banco, $querryInsertOds);
          if (!$sql2) {
            echo ('erro no banco de dados ' . mysqli_error($banco));
          }
        } else {
          $querryInsertOds = "insert into projetos_com_ods_parceiros values(" . $ultimo_id . "," . $this->opOds[$i] . "," . $this->partiner[$i] . ");";
          $sql2 = mysqli_query($banco, $querryInsertOds);
          if (!$sql2) {
            echo ('erro no banco de dados ' . mysqli_error($banco));
          }
        }
      }
    } else if ($totalOds == $totalPartiner) {
      for ($i = 0; $i < count($this->partiner); $i++) {
        $querryInsertOds = "insert into projetos_com_ods_parceiros values(" . $ultimo_id . "," . $this->opOds[$i] . "," . $this->partiner[$i] . ");";
        $sql2 = mysqli_query($banco, $querryInsertOds);
      }
    }
  } // method
} // class
?>