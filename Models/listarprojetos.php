<?php
class listarOds{
    private $ods;
    public function __get($atributo)
    {
      return $this->$atributo;
    }
    public function __set($atributo, $valor)
    {
      $this->$atributo = $valor;
    }
function listardados()
{
    include('conexao.php');
    $querry = ("select * from projetos where ods_id_1 =" . $this ->ods);
    $sql = mysqli_query($banco, $querry);
    $linhas = mysqli_num_rows($sql);
    $registros = array(); // Array para armazenar os registros

    for ($i = 0; $i < $linhas; $i++) {
        $registro = mysqli_fetch_row($sql);
        $registros[] = $registro; // Adiciona o registro ao array de registros
    }

    echo json_encode($registros); // Imprime os registros no formato JSON

    mysqli_close($banco);
}
}// fim class
?>