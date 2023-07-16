document.addEventListener('DOMContentLoaded',async ()=>
{
    const citys = document.querySelector("#cidadeProjeto");
    verifyLogin();
    const urlCitys = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/43/municipios`;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", urlCitys, false);
    xhr.send();
    if (xhr.readyState === 4 && xhr.status === 200) {
        let response = JSON.parse(xhr.response);
    const optionsCitys = document.createElement('optgroup')
    response.forEach(citys =>
        {
            optionsCitys.innerHTML +=`<option>${citys.nome}</option>` 
        })
        citys.appendChild(optionsCitys);
}// if request
seacrhProject()
})// event DOM
// Inicializar Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDyZVF1WDjTLkKcnDhz1e-wKGVOl9g5Hn8",
    authDomain: "teste-170423.firebaseapp.com",
    projectId: "teste-170423",
    storageBucket: "teste-170423.appspot.com",
    messagingSenderId: "564787693295",
    appId: "1:564787693295:web:c7e7590016eace397cbd1a"
  };
 firebase.initializeApp(firebaseConfig);
 const storage = firebase.storage();//Fim da inicialização

var inserirCPF= document.querySelector("#CPF");
inserirCPF.value= localStorage.getItem("cpf");

let btnSendProject = document.querySelector("#btnEnviar")
btnSendProject.addEventListener('click', function () {
    sendEditProject(event);
})
function verifyLogin()
{
if(localStorage.getItem("id")==null){ window.location.href=("../index.html")}

}
function seacrhProject()
{
    const idProjeto = document.querySelector('#idProjeto')
    const nameProject = document.querySelector("#nomeProjeto");
    const stateProject = document.querySelector("#estadoProjeto")
    const cityProject = document.querySelector("#cidadeProjeto")
    const descriptionProject = document.querySelector("#descricaoProjeto")
    const objectProject = document.querySelector("#objetivoProjeto")
    const idCreator = localStorage.getItem("id");
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
           idProjeto.value = responseSearchProject[0].id_projeto;
           nameProject.value = responseSearchProject[0].nome_projeto;
           stateProject.value = responseSearchProject[0].stateProject;
           cityProject.value = responseSearchProject[0].cidade_projeto;
           descriptionProject.value = responseSearchProject[0].descricao_projeto;
           objectProject.value = responseSearchProject[0].objetivo_projeto;
        }
    };
    xhr.send();
} 

function sendEditProject()
{
    event.preventDefault();
    const idProjeto = document.querySelector('#idProjeto').value
    const nameProject = document.querySelector("#nomeProjeto").value;
    const stateProject = document.querySelector("#estadoProjeto").value
    const cityProject = document.querySelector("#cidadeProjeto").value
    const descriptionProject = document.querySelector("#descricaoProjeto").value
    const objectProject = document.querySelector("#objetivoProjeto").value
    console.log(idProjeto)
    console.log(nameProject)
    console.log(stateProject)
    console.log(cityProject)
    console.log(descriptionProject)
    console.log(objectProject)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/senac-dojo-2023/controllers/controllerEditProject.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200)
        {
            response = xhr.responseText;
            console.log(response)
        }
    } 
    xhr.send("idProjeto="+encodeURIComponent(idProjeto)+
             "&nomeProjeto="+encodeURIComponent(nameProject)+
             "&estadoProjeto="+encodeURIComponent(stateProject)+
             "&cidadeProjeto="+encodeURIComponent(cityProject)+
             "&descricaoProjeto="+encodeURIComponent(descriptionProject)+
             "&objetivoProjeto="+encodeURIComponent(objectProject)
            );  
}
function teste ()
{
    console.log("ois")
}