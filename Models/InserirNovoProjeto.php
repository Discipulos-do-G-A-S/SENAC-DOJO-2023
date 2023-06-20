<?php
class dadosProjetos
{
  private $nomeProjeto;
  private $cidadeProjeto;
  private $descricaoProjeto;
  private $objetivoProjeto;
  private $id_criador;
  private $ods;
  private $op;
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
    $querry = "insert into projetos values (null,'" . $this->nomeProjeto . "','" . $this->cidadeProjeto . "','" . $this->descricaoProjeto . "','" . $this->objetivoProjeto . "','" . $this->chave_midia . "'," . $this->id_criador .");";
    $exec = mysqli_query($banco, $querry);
    $ultimo_id = mysqli_insert_id($banco);
    echo ('Projeto com id:'.$ultimo_id.' inserido com sucesso.');
    foreach ($this->op as $opcao) {
      $querryInsertOds= "insert into projetos_com_ods_parceiros values (".$ultimo_id.",".$opcao.",1);";
      $execSecond = mysqli_query($banco,$querryInsertOds);
    }
    if ($exec == false || $execSecond == false) {
      echo ('Erro no banco de dados' . mysqli_error($banco));
    }
  }    
} // classDadosProjeto
?>