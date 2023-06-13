<?php
class dadosProjetos
{
  private $nomeProjeto;
  private $cidadeProjeto;
  private $descricaoProjeto;
  private $objetivoProjeto;
  private $id_criador;
  private $ods;
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
    if ($this->nomeProjeto == null || $this->cidadeProjeto == null || $this->descricaoProjeto == null || $this->objetivoProjeto == null || $this->id_criador == null || $this->ods == null) {
      header('location:http://localhost/SENAC-DOJO-2023/views/inserirProjeto.html');
    } else {
      include('conexao.php');
      $querry = "insert into projetos values (null,'" . $this->nomeProjeto . "','" . $this->cidadeProjeto . "','" . $this->descricaoProjeto . "','" . $this->objetivoProjeto . "','" . $this->chave_midia . "'," . $this->id_criador . "," . $this->ods . ");";
      $sql = mysqli_query($banco, $querry);
      $ultimo_id = mysqli_insert_id($banco);
      echo ("projeto numero -> ".$ultimo_id." inserido com sucesso");
      header('refresh:5.0; http://localhost/SENAC-DOJO-2023/views/inserirProjeto.html');
      if ($sql == false) {
        echo ('Erro no banco de dados' . mysqli_error($banco));
        header('refresh:2.0; http://localhost/SENAC-DOJO-2023/views/inserirProjeto.html');
      }
    }
  }
} // classDadosProjeto
//ATENÇÃO: PARA RESOLVER O PROBLEMA DA BARRA INVERTIDA DEVE USAR O COMANDO stripslashes() LOGO APÓS O DECODE NA HORA QUE FOR USAR O JSON.
//ATENÇÃO: DEVE SER TESTADO EM UM PC SEM RESTRIÇÕES PARA VER FUNCIONA O TRADUTOR DE ACENTOS.
?>