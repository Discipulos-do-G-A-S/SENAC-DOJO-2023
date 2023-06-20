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
            $query = "SELECT id_user, cpf_user, password_user FROM users WHERE cpf_user = '" . $this->cpf . "' AND password_user = '" . $this->password . "';"; 
            $sql = mysqli_query($banco, $query);
            $rowReturned = mysqli_num_rows($sql);
            if ($rowReturned == 1) {
                $registros = array();
                $registro = mysqli_fetch_assoc($sql);
                $registros[] = $registro;
                echo json_encode($registros);
            } else {
                echo json_encode([]);
            }
            mysqli_close($banco);
        }
    }
} 
?>
