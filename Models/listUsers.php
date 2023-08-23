<?php
class listUsers {
    public function __get($atributo) {
        return $this->$atributo;
    }

    public function __set($atributo, $valor) {
        $this->$atributo = $valor;
    }

    function listAllUsers() {
        include('connection.php');
        $query = "SELECT id_user, nome_user FROM users WHERE cargo=2;";//cargo 2 pq é apenas os usuarios e não os adms
        $sql = mysqli_query($banco, $query);
        $rows = mysqli_num_rows($sql);
        $records = array(); // Array to store the records
        for ($i = 0; $i < $rows; $i++) {
            $record = mysqli_fetch_row($sql);
            $records[] = $record; // Add the record to the array of records
        }
        echo json_encode($records); // Print the records in JSON format
        mysqli_close($banco);
    }
}// class
?>
