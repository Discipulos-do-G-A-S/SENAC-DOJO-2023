<?php
function listardados()
{
    $ods = $_GET['valor'];
    include('conexao.php');
    $querry = ("select * from projetos where ods_id_1 =" . $ods);
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
listardados();

?>