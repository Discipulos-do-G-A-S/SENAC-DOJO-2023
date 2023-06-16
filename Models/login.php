<?php 
class dadosLogin { 
    private $cpf; 
    private $password; 
    private $id; 

    public function __get($atributo) { 
        return $this->$atributo; 
    } 

    public function __set($atributo, $valor) { 
        $this->$atributo = $valor; 
    } 

    public function validarLogin() {
        if ($this->cpf == null || $this->password == null) {
            // header('refresh:2.0; http://localhost/SENAC-DOJO-2023/login.html');
        } else {
            session_start();
            include('conexao.php');
            $querry = ("select cpf_user, senha_user, id_logins from logins where cpf_user = '" . $this->cpf . "' and senha_user='" . $this->password . "';");
            $sql = mysqli_query($banco, $querry);
            $resultado = mysqli_num_rows($sql);
            if ($resultado == 1) {
                $registros = array(); // Array to store the records
                $registro = mysqli_fetch_assoc($sql); // Use mysqli_fetch_assoc to get an associative array
                $registros[] = $registro;
                echo json_encode($registros);
            } else {
                echo json_encode([]); // Retorna JSON vazio
            }
            mysqli_close($banco);
        }
    }
    
} 
?>
