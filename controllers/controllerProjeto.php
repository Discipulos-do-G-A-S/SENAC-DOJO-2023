<?php
include('../Models/InserirNovoProjeto.php');
 $INP = new dadosProjetos;
 $INP -> nomeProjeto = $_POST['nomeProjeto'];
 $INP -> cidadeProjeto = $_POST['cidadeProjeto'];
 $INP -> descricaoProjeto = $_POST['descricaoProjeto'];
 $INP -> objetivoProjeto = $_POST['objetivoProjeto'];
 $INP -> id_criador = $_POST['id'];
 $INP -> ods = $_POST['ods'];
 $INP ->inserirProjeto();
?>