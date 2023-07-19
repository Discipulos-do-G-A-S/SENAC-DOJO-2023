document.addEventListener("DOMContentLoaded", function () {
  var urlParams = new URLSearchParams(window.location.search);
  var valor = urlParams.get("ods");
  var valueCause = urlParams.get("causa");
  if(valor)
  {
    displayAllProjects();
    displayAllprojectsFromCity();
  }
  else 
  {
    displayAllprojectsFromCityofCause();
  }  
});

function displayAllprojectsFromCity() {
  const citys = document.querySelector("#cidadeProjeto");
  const urlCitys = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/43/municipios`;
  var xhrcitys = new XMLHttpRequest();
  xhrcitys.open("GET", urlCitys, true);
  xhrcitys.send();
  xhrcitys.onreadystatechange = function () {
    if (xhrcitys.readyState === 4 && xhrcitys.status === 200) {
      let responsecitys = JSON.parse(xhrcitys.response);
      const optionsCitys = document.createElement("optgroup");
      optionsCitys.innerHTML += `<option>Selecione uma cidade</option>`;
      responsecitys.forEach((city) => {
        optionsCitys.innerHTML += `<option>${city.nome}</option>`;
      });
      citys.innerHTML = "";
      citys.appendChild(optionsCitys);
    }
  };

  // Registrando o evento change apenas uma vez
  citys.addEventListener("change", handleCityChange);

  function handleCityChange() {
    var xhrProject = new XMLHttpRequest();
    var urlParams = new URLSearchParams(window.location.search);
    var valor = urlParams.get("ods");
    xhrProject.open("GET", "http://localhost/senac-dojo-2023/controllers/controllerOds.php?ods=" + valor, true);
    xhrProject.send();
    xhrProject.onreadystatechange = function () {
      if (xhrProject.readyState === 4 && xhrProject.status === 200) {
        const valueCitys = document.querySelector("#cidadeProjeto").value;
        let responseProject = JSON.parse(xhrProject.responseText);
        responseProject = responseProject.filter((res) => res.cidade_projeto == valueCitys);
        var html = "";
        if(responseProject.length === 0)
        {
          html += '<div class="container">';
          html += `<h1>Ainda não existem projetos dessa Causa</h1>`
          html += "</div>";
        }
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
    };
  }
}

function displayAllprojectsFromCityofCause() {
  const citys = document.querySelector("#cidadeProjeto");
  const urlCitys = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/43/municipios`;
  var xhrcitys = new XMLHttpRequest();
  xhrcitys.open("GET", urlCitys, true);
  xhrcitys.send();
  xhrcitys.onreadystatechange = function () {
    if (xhrcitys.readyState === 4 && xhrcitys.status === 200) {
      let responsecitys = JSON.parse(xhrcitys.response);
      const optionsCitys = document.createElement("optgroup");
      optionsCitys.innerHTML += `<option>Selecione uma cidade</option>`;
      responsecitys.forEach((city) => {
        optionsCitys.innerHTML += `<option>${city.nome}</option>`;
      });
      citys.innerHTML = "";
      citys.appendChild(optionsCitys);
    }
  };

  // Registrando o evento change apenas uma vez
  citys.addEventListener("change", handleCityChange);

  function handleCityChange() {
    var xhrProject = new XMLHttpRequest();
    var urlParams = new URLSearchParams(window.location.search);
    var cause = urlParams.get("causa");
    xhrProject.open("GET", "http://localhost/senac-dojo-2023/controllers/controllerProjectFromCause.php?cause=" + cause, true);
    xhrProject.send();
    xhrProject.onreadystatechange = function () {
      if (xhrProject.readyState === 4 && xhrProject.status === 200) {
        const valueCitys = document.querySelector("#cidadeProjeto").value;
        let responseProject = JSON.parse(xhrProject.responseText);
        responseProject = responseProject.filter((res) => res.cidade_projeto == valueCitys);
        var html = "";
        if(responseProject.length === 0)
        {
          html += '<div class="container">';
          html += `<h1>Ainda não existem projetos dessa Causa</h1>`
          html += "</div>";
        }
        for (let i = 0; i < responseProject.length; i++) {
          html += '<div class="containerProjetos">';
          html += '<link rel="stylesheet" href="../public/stylesheets/listarProjetosOds.css">';
          html += '<div class="cardProjetos">';
          html += '<img src="../public/img/img_projeto_vida_verde.jpg">';
          html += `<a href=../views/telaProjeto.html?id=${responseProject[i].id_projeto}>Nome do projeto: ${responseProject[i].nome_projeto}</a>`;
          html += `<p>ODS do projeto: ${responseProject[i].nome_ods}</p>`;
          html += "</div>";
          html += "</div>";
        }
        document.getElementById("divNomeProjeto").innerHTML = html;
      }
    };
  }
}

function displayAllProjects() {
  var urlParams = new URLSearchParams(window.location.search);
  var valor = urlParams.get("ods");
  console.log(valor)
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost/senac-dojo-2023/controllers/controllerDataOds.php?ods=" + valor, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);
      console.log(response);
      if (response.length == 0) {
        var html = "";
        document.getElementById('textOds').innerHTML = "<p>Nenhum dado encontrado para essa ODS.</p>";
      } else {
        var html = "";
        html += `<h1>${response[0].nome_ods}</h1>`;
        html += `<h1>Total de projetos da ODS: ${response.length}</h1>`;
        html += `<textarea cols='180'>${response[0].texto_ods}</textarea>`;
        document.getElementById('textOds').innerHTML = html;
      }
    }
  };
  xhr.send();
}
