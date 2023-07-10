document.addEventListener("DOMContentLoaded", function() {
    RequisitarTodosProjetosODS()
  });  

 function RequisitarTodosProjetosODS()
  {
    var urlParams = new URLSearchParams(window.location.search);
    var valor = urlParams.get("valor");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/senac-dojo-2023/controllers/controllerOds.php?ods=" + valor, false);
    xhr.send();
    if (xhr.readyState === 4 && xhr.status === 200) {
    let response = JSON.parse(xhr.responseText);
    console.log(response);
    var html = ''; // Variável para armazenar o HTML gerado
    for(let i=0; i<response.length;i++)
    { html += '<div>'
      html += `<a href= ../views/telaProjeto.html?id=${response[i].id_projeto}>Nome do projeto: ${response[i].nome_projeto}</a>`
      html += `<p>ODS do projeto: ${response[i].nome_ods}</p>`
      html += '</div>'
      html += '<br>'
    }
    document.getElementById('divNomeProjeto').innerHTML = html;
    
  }
}