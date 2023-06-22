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
    foreach ($this->opOds as $opcao) {
      $querryInsertOds = "insert into projetos_com_ods_parceiros (projeto_id, ods_id) values (" . $ultimo_id . ", " . $opcao . ");";
      $sql2 = mysqli_query($banco,$querryInsertOds);
    }
    foreach($this ->partiner as $partiners){
      $querryInsertPartiners = "insert into projetos_com_ods_parceiros (projeto_id, parceiro_id) values (" . $ultimo_id . ", '" . $partiners . "');";
      $sql3 = mysqli_query($banco,$querryInsertPartiners);
    }
    if ($sql == false || $sql2 == false || $sql3 == false) {
      echo ('Erro no banco de dados' . mysqli_error($banco));
    }
  }    
} // classDadosProjeto
?>