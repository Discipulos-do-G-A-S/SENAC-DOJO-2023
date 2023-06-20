<?php
include('../Models/InserirNovoProjeto.php');
 $INP = new dadosProjetos;
 $INP -> nomeProjeto = $_POST['nomeProjeto'];
 $INP -> cidadeProjeto = $_POST['cidadeProjeto'];
 $INP -> descricaoProjeto = $_POST['descricaoProjeto'];
 $INP -> objetivoProjeto = $_POST['objetivoProjeto'];
 $INP->op =$_POST['opcao'];
 $INP -> id_criador = $_POST['idCriador'];
 $INP -> ods = $_POST['ods'];
 $INP ->inserirProjeto();
?>