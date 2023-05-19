<?php
 class dadosLogin
 {
    private $cpf;
    private $password;
    private $id;
 
    public function __get($atributo)
    {
        return $this->$atributo;
    }
    public function __set($atributo, $valor)
    {
        $this->$atributo = $valor;
    }

  public function validarLogin()
  {
    if($this -> cpf == null || $this -> password == null)
    {
        header('refresh:2.0; http://localhost/SENAC-DOJO-2023/login.html');
    }
    else{
        session_start();
        include('conexao.php');
        $querry = ("select cpf_user,senha_user, id_logins from logins where cpf_user = '" . $this->cpf . "' and senha_user='" . $this->password . "';");
        $sql = mysqli_query($banco, $querry);
        $resultado = mysqli_num_rows($sql);
        echo($resultado);
        if ($resultado == 1) {
            for ($i=0; $i < $resultado ; $i++) { 
                $x = mysqli_fetch_row($sql);
               echo $_SESSION['id'] = 'lucas pedroso';
               echo $_SESSION['cpf'] = $x[1];
               echo $_SESSION['password'] = $x[2];
            }
            header('location:http://localhost/SENAC-DOJO-2023/views/inserirProjeto.html');
        } else {
            header('refresh:2.0; http://localhost/SENAC-DOJO-2023/login.html');
        }
        mysqli_close($banco);
}
  }
} 
?>