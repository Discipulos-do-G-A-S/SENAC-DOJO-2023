document.addEventListener("DOMContentLoaded", function () 
{
 verifyLogin();
});





function verifyLogin()
    {
    if(sessionStorage.getItem("id")==null){ window.location.href=("../index.html")}
    else
    {
        displayDataUser();
    }
    } 

function displayDataUser(){
    const idUser = document.querySelector('#idProjeto')
    const nameUser = document.querySelector("#nomeProjeto");
    const stateProject = document.querySelector("#estadoProjeto")
    const cityProject = document.querySelector("#cidadeProjeto")
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get("id");
    console.log(id);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/senac-dojo-2023/controllers/controllerSearchProject.php?id="+id, false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Requisição concluída com sucesso");
           responseSearchProject = JSON.parse(xhr.responseText);
           console.log(responseSearchProject)
           idUser.value = responseSearchProject[0].id_projeto;
           nameUser.value = responseSearchProject[0].nome_projeto;
           stateProject.value = responseSearchProject[0].estado_projeto;
           cityProject.value = responseSearchProject[0].cidade_projeto;
           descriptionProject.value = responseSearchProject[0].descricao_projeto;
           objectProject.value = responseSearchProject[0].objetivo_projeto;
        }
    };
    xhr.send();
}