let btnLogin = document.querySelector("#login");
btnLogin.addEventListener('click', function(event) {
  validateLogin(event);
});

function validateLogin(event) {
    event.preventDefault();
    const cpf = document.querySelector("#cpf").value;
    const password = document.querySelector("#senha").value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/SENAC-DOJO-2023/controllers/controllerLogin.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {     
            let response = JSON.parse(xhr.responseText);
            if (response.length === 0 || (response.length > 0 && (response[0].cpf_user !== cpf || response[0].password_user  !== password))) {
              var html = "<p>Dados incorretos, digite novamente</p>";
              document.getElementById('snhError').innerHTML = html;
              cpf.setValue=""
              password.setValue=""
              document.querySelector("#cpf").focus();
            } else {
              sessionStorage.setItem("id", response[0].id_user);
              sessionStorage.setItem("cpf",response[0].cpf_user);
              window.open("../views/inserirProjeto.html");
            }
          } else {
            console.log("Erro na requisição: " + xhr.status);
          }
        }
      };
      
    xhr.send("cpf=" + cpf + "&senha=" + password);
  }