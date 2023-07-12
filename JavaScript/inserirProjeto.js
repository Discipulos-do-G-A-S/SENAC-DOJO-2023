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

let btnEnviar = document.querySelector("#btnEnviar")
btnEnviar.addEventListener('click', function () {
   EnviarProjeto(event);
})

const state = document.querySelector('#estadoProjeto');
const citys = document.querySelector("#cidadeProjeto");
console.log(citys.value);
document.addEventListener('DOMContentLoaded',async ()=>
{
    verifyLogin();
    const urlStates = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", urlStates, false);
    xhr.send();
    if (xhr.readyState === 4 && xhr.status === 200) {
        let response = JSON.parse(xhr.response);
    const optionsStates = document.createElement('optgroup')
    optionsStates.setAttribute('label',"selecione um estado")
    response.forEach(states => {
        optionsStates.innerHTML +=`<option>${states.sigla}</option>`
    });
    state.appendChild(optionsStates)
    }
})
state.addEventListener('change', async()=>
{
    const urlCitys = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.value}/municipios`;
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
let cityss = document.querySelector("#cidadeProjeto").value;
    console.log(cityss);
})
function EnviarProjeto() {
    event.preventDefault();
    let opcaosOds = document.querySelectorAll("#opcaoOds input[type='checkbox']")
    let odsSelecionadas = [];

    for (let i = 0; i < opcaosOds.length; i++) {
        if (opcaosOds[i].checked) {
            odsSelecionadas.push(opcaosOds[i].value)
        }
    }
    let opcaosPatrocinadores = document.querySelectorAll("#opcaoPartiners input[type='checkbox']")
    let PatrocinadoresSelecionados = [];

    for (let i = 0; i < opcaosPatrocinadores.length; i++) {
        if (opcaosPatrocinadores[i].checked) {
            PatrocinadoresSelecionados.push(opcaosPatrocinadores[i].value)
        }
    }

    let nomeProjeto = document.querySelector("#nomeProjeto").value;
    let estadoProjeto = document.querySelector("#estadoProjeto").value;
    let cidadeProjeto = document.querySelector("#cidadeProjeto").value;
    let descricaoProjeto = document.querySelector("#descricaoProjeto").value;
    let objetivoProjeto = document.querySelector("#objetivoProjeto").value;
    let idCriador = localStorage.getItem("id");
    let opOds = odsSelecionadas;
    let opPartiners = PatrocinadoresSelecionados;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/senac-dojo-2023/controllers/controllerProjeto.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Requisição concluída com sucesso");
            alert("Projeto inserido com sucesso");
            console.log(xhr.responseText);

            // Pegar o ID do projeto
        var response = xhr.responseText;
        var startIndex = response.indexOf("id: ") + 4; // Obter o índice inicial do ID
        var endIndex = response.indexOf(" ", startIndex); // Obter o índice final do ID
        var idProjeto = response.substring(startIndex, endIndex);
            // Verificar se o ID do projeto é válido
            if (idProjeto) {
                // Criando a referência da pasta com base no ID do projeto
                var folderRef = storage.ref().child(idProjeto);

                // Obtendo os arquivos selecionados no input de fotos e vídeos
                var input = document.getElementById("photo");
                var files = input.files;

                // Fazendo o upload dos arquivos para a pasta com o nome do projeto
                for (let i = 0; i < files.length; i++) {
                    var file = files[i];
                    var fileRef = folderRef.child(file.name);
                    fileRef.put(file).then(function(snapshot) {
                        // Upload concluído
                    });
                }

                alert("Arquivos enviados para a pasta -> " + idProjeto);
            }
        }
    };
    xhr.send("nomeProjeto="+encodeURIComponent(nomeProjeto)+
             "&estadoProjeto="+encodeURIComponent(estadoProjeto)+
             "&cidadeProjeto="+encodeURIComponent(cidadeProjeto)+
             "&descricaoProjeto="+encodeURIComponent(descricaoProjeto)+
             "&objetivoProjeto="+encodeURIComponent(objetivoProjeto)+
             "&idCriador="+encodeURIComponent(idCriador)+
             "&opcaoOds="+encodeURIComponent(JSON.stringify(opOds))+
             "&opcaoPatrocinador="+encodeURIComponent(JSON.stringify(opPartiners)) 
    );   
}// function project
function verifyLogin()
{
if(localStorage.getItem("id")==null){ window.location.href=("../index.html")}

}