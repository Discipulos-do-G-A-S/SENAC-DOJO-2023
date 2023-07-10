document.addEventListener("DOMContentLoaded", function () {
  RequisitarTodosProjetos()
});

const botoes = document.querySelectorAll('button[name="btn"]');
botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    enviarValorOds(botao.value);
  });
});

function enviarValorOds(valorBotao) {
  window.location.href = "../views/projetos.html?valor=" + valorBotao;
}

function RequisitarTodosProjetos() {
  filtro = "*"
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost/senac-dojo-2023/controllers/controllerAllProjetos.php", false);
  xhr.send();
  if (xhr.readyState === 4 && xhr.status === 200) {
    var responseJson = JSON.parse(xhr.responseText);
    console.log(responseJson);
    var html = ''; // Variável para armazenar o HTML gerado
    if (responseJson.length < 1) {
      html += '<h1 class=textoODs> Atualmente não existem projetos </h1>';
    }
    else {
      html += '<h1 class=textoODs> TOTAL DE PROJETOS: ' + '<span>' + responseJson.length + '</span>' + '</h1>';
    }
    document.getElementById('totalOds').innerHTML = html;
  }
}