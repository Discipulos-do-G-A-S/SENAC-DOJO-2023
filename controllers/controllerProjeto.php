<?php
include('../Models/InserirNovoProjeto.php');
 $INP = new dadosProjetos;
 $INP -> nomeProjeto = $_POST['nomeProjeto'];
 $INP -> cidadeProjeto = $_POST['cidadeProjeto'];
 $INP -> descricaoProjeto = $_POST['descricaoProjeto'];
 $INP -> objetivoProjeto = $_POST['objetivoProjeto'];
 $INP -> idCriador = $_POST['idCriador'];
 $INP->opOds =$_POST['opcaoOds'];
 $INP->partiner =$_POST['opcaoPatrocinador'];
 $INP ->inserirProjeto();
?>