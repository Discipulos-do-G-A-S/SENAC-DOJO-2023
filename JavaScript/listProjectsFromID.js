document.addEventListener("DOMContentLoaded", function () 
{
 verifyLogin();
});
function displayAllProjects() {
    const idCreator = sessionStorage.getItem("id");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/senac-dojo-2023/controllers/controllerProjectsFromIdUser.php?id=" + idCreator, false);
    xhr.send();
    if (xhr.readyState === 4 && xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);
      console.log(response)
      var html=""
      for(let i=0; i < response.length; i++)
      {
        html += `<div class="cardProjeto">`
        html += `<img class="imgCard" src="../public/img/SDG-Wheel.png">`
        html += `<div class="conteudoCard">`
        html += `<p>Projeto: </p>`
        html += `<span class="span2">${response[i].nome_projeto}</span>`
        html += `<p>ID do projeto: </p>`
        html += `<span class="span2">${response[i].id_projeto}</span>`
        html += `<div class"buttonsCard">`
        html += `<a href="./editProject.html?id=${response[i].id_projeto}"><button class="material-symbols-outlined">edit</button></a> <a href="./deleteProject.html?id=${response[i].id_projeto}" ><button class="material-symbols-outlined">Delete</button></a>`
        html += `</div>`
        html += `</div>`
        html += `</div>`
      }
      }
      document.getElementById('container').innerHTML = html;
    }// method request allProjects
    function verifyLogin()
    {
    if(sessionStorage.getItem("id")==null){ window.location.href=("../index.html")}
    else
    {
        displayAllProjects();
    }
    }    