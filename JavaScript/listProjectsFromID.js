document.addEventListener("DOMContentLoaded", function () 
{
 verifyLogin();
});
function displayAllProjects() {
    const idCreator = localStorage.getItem("id");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/senac-dojo-2023/controllers/controllerProjectsFromIdUser.php?id=" + idCreator, false);
    xhr.send();
    if (xhr.readyState === 4 && xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);
      console.log(response)
      var html=""
      for(let i=0; i < response.length; i++)
      {
        html += `<div class="card">`
        html += `<span class="span1">`
        html += `<img class="img" src="../public/img/img_projeto_vida_verde.jpg"> projeto: `
        html += `<span class="span2">${response[i].nome_projeto}</span>`
        html += ` ID do projeto: `
        html += `<span class="span2">${response[i].id_projeto}</span>`
        html += `<div class"buttons">`
        html += `<a href="./editProject.html?id=${response[i].id_projeto}"><button class="material-symbols-outlined">edit</button></a> <a><button class="material-symbols-outlined">Delete</button></a>`
        html += `</div>`
        html += `</span>`
        html += `</div>`
      }
      }
      document.getElementById('container').innerHTML = html;
    }// method request allProjects
    function verifyLogin()
    {
    if(localStorage.getItem("id")==null){ window.location.href=("../index.html")}
    else
    {
        displayAllProjects();
    }
    }    