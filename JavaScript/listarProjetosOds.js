document.addEventListener("DOMContentLoaded", function () {
  RequisitarTodosProjetosODS()
});

function RequisitarTodosProjetosODS() {
  var urlParams = new URLSearchParams(window.location.search);
  var valor = urlParams.get("valor");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost/senac-dojo-2023/controllers/controllerOds.php?ods=" + valor, false);
  xhr.send();
  if (xhr.readyState === 4 && xhr.status === 200) {
    let response = JSON.parse(xhr.responseText);
    console.log(response);
    var html = ''; // Variável para armazenar o HTML gerado
    for (let i = 0; i < response.length; i++) {
      html += '<div class="container">'
      html += '<link rel="stylesheet" href="../public/stylesheets/listarProjetosOds.css">'
      html += '<div class="card">'
      html += '<img src="../public/img/img_projeto_vida_verde.jpg">'
      html += `<a href= ../views/telaProjeto.html?id=${response[i].id_projeto}>Nome do projeto: ${response[i].nome_projeto}</a>`
      html += `<p>ODS do projeto: ${response[i].nome_ods}</p>`
      html += '</div>'
      html += '</div>'
      html += '<br>'
    }
    document.getElementById('divNomeProjeto').innerHTML = html;

  }
}