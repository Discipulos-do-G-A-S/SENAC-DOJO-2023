<?php
class dadosProjetos
{
  private $nomeProjeto;
  private $cidadeProjeto;
  private $descricaoProjeto;
  private $objetivoProjeto;
  private $id_criador;
  private $ods;
  private $chave_midia;

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
      echo ($ultimo_id);
      if ($sql == false) {
        echo ('Erro no banco de dados' . mysqli_error($banco));
        header('refresh:2.0; http://localhost/SENAC-DOJO-2023/views/inserirProjeto.html');
      } else {
        $projeto =
          [
            'id-projeto' => mysqli_insert_id($banco),
            'nomeProjeto' => $this->nomeProjeto,
            'cidadeProjeto' => $this->cidadeProjeto,
            'descricaoProjeto' => $this->descricaoProjeto,
            'objetivoProjeto' => $this->objetivoProjeto,
            'chave de midia' => $this->chave_midia,
            'cpfCriador' => $this->id_criador,
            'ods' => $this->ods
          ];
        $arquivo_json = "../json/dadosProjeto.json";
        $json_atual = file_get_contents($arquivo_json);
        $dados = json_decode($json_atual, true);
        $json = json_encode($projeto, JSON_UNESCAPED_UNICODE);
        file_put_contents($arquivo_json, $json);
        $dados[] = $projeto;
        $json_atualizado = json_encode($dados);
        file_put_contents($arquivo_json, $json_atualizado);
      }
    }
  }
} // classDadosProjeto
//ATENÇÃO: PARA RESOLVER O PROBLEMA DA BARRA INVERTIDA DEVE USAR O COMANDO stripslashes() LOGO APÓS O DECODE NA HORA QUE FOR USAR O JSON.
//ATENÇÃO: DEVE SER TESTADO EM UM PC SEM RESTRIÇÕES PARA VER FUNCIONA O TRADUTOR DE ACENTOS.
?>