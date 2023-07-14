document.addEventListener("DOMContentLoaded", function () {
  displayAllprojectsFromCity()
});

function displayAllProjects() {
  var urlParams = new URLSearchParams(window.location.search);
  var valor = urlParams.get("ods");
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
}// request allProjects
function displayAllprojectsFromCity()
{
  const state = document.querySelector("#estadoProjeto");
  const citys = document.querySelector("#cidadeProjeto");
  const urlStates = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", urlStates, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let responseState = JSON.parse(xhr.response);
      const optionsStates = document.createElement("optgroup");
      optionsStates.setAttribute("label", "Selecione um estado");
      responseState.forEach((stateItem) => {
        optionsStates.innerHTML += `<option>${stateItem.sigla}</option>`;
      });
      state.appendChild(optionsStates);
    }
  };
  state.addEventListener("change", async () => {
    const urlCitys = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.value}/municipios`;
    var xhrcitys = new XMLHttpRequest();
    xhrcitys.open("GET", urlCitys, true);
    xhrcitys.send();
    xhrcitys.onreadystatechange = function () {
      if (xhrcitys.readyState === 4 && xhrcitys.status === 200) {
        let responsecitys = JSON.parse(xhrcitys.response);
        const optionsCitys = document.createElement("optgroup");
        responsecitys.forEach((city) => {
          optionsCitys.innerHTML += `<option>${city.nome}</option>`;
        });
        citys.innerHTML = "";
        citys.appendChild(optionsCitys);
      }
    };
  });
citys.addEventListener("change",()=>
{
  var xhrProject = new XMLHttpRequest()
  var urlParams = new URLSearchParams(window.location.search);
  var valor = urlParams.get("ods");
  xhrProject.open("GET", "http://localhost/senac-dojo-2023/controllers/controllerOds.php?ods=" + valor, true);
  xhrProject.send();
  xhrProject.onreadystatechange = function () {
    if (xhrProject.readyState === 4 && xhrProject.status === 200) {
      const valueCitys = document.querySelector("#cidadeProjeto").value;
  console.log(valueCitys)
      let responseProject = JSON.parse(xhrProject.responseText);
      console.log(responseProject);
      responseProject = responseProject.filter((res) => res.cidade_projeto == "Alvarães");
      var html = "";
      console.log(responseProject.length)
      for (let i = 0; i < responseProject.length; i++) {
        html += '<div class="container">';
        html += '<link rel="stylesheet" href="../public/stylesheets/listarProjetosOds.css">';
        html += '<div class="card">';
        html += '<img src="../public/img/img_projeto_vida_verde.jpg">';
        html += `<a href=../views/telaProjeto.html?id=${responseProject[i].id_projeto}>Nome do projeto: ${responseProject[i].nome_projeto}</a>`;
        html += `<p>ODS do projeto: ${responseProject[i].nome_ods}</p>`;
        html += "</div>";
        html += "</div>";
        html += "<br>";
      }
      document.getElementById("divNomeProjeto").innerHTML = html;
    }
  }
}) 

}