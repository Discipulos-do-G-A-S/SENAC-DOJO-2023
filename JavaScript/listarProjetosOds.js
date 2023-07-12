document.addEventListener("DOMContentLoaded", function () {
  RequisitarTodosProjetos()
});

function RequisitarTodosProjetosODS() {
  var urlParams = new URLSearchParams(window.location.search);
  var valor = urlParams.get("valor");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost/senac-dojo-2023/controllers/controllerOds.php?ods=" + valor, false);
  xhr.send();
  if (xhr.readyState === 4 && xhr.status === 200) {
    let response = JSON.parse(xhr.responseText);
    response= response.filter(response =>response.cidade_projeto==="Rio de Janeiro");
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
    //document.getElementById('divNomeProjeto').innerHTML = html="";

  }
}


function RequisitarTodosProjetos() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost/senac-dojo-2023/controllers/controllerOds.php", false);
  xhr.send();
  if (xhr.readyState === 4 && xhr.status === 200) {
    let responses = JSON.parse(xhr.responseText);
    //
    //if(filtro1!=null){
//responses= responses.filter(responses =>responses.cidade_projeto==="Rio de Janeiro");
    //}
    //if(){
//responses= responses.filter(responses =>responses.cidade_projeto==="Rio de Janeiro");
    //}
    //if(){
      //responses= responses.filter(responses =>responses.cidade_projeto==="Rio de Janeiro");
    //}
    //if(){
      //responses= responses.filter(responses =>responses.cidade_projeto==="Rio de Janeiro");
    //}
    const finalResponses= [];
    const uniqueProjects=[];
    responses.forEach(response => {
      if (!uniqueProjects.includes(response.id_projeto)) {
        uniqueProjects.push(response.id_projeto);
        finalResponses.push(response);
      }
    });
    console.log(finalResponses);
    var html = ''; // Variável para armazenar o HTML gerado
    for (let i = 0; i < finalResponses.length; i++) {
      html += '<div class="container">'
      html += '<link rel="stylesheet" href="../public/stylesheets/listarProjetosOds.css">'
      html += '<div class="card">'
      html += '<img src="../public/img/img_projeto_vida_verde.jpg">'
      html += `<a href= ../views/telaProjeto.html?id=${finalResponses[i].id_projeto}>Nome do projeto: ${finalResponses[i].nome_projeto}</a>`
      html += `<p>ODS do projeto: ${finalResponses[i].nome_ods}</p>`
      html += '</div>'
      html += '</div>'
      html += '<br>'
    }
    document.getElementById('divNomeProjeto').innerHTML = html;
    //document.getElementById('divNomeProjeto').innerHTML = html="";

  }
}