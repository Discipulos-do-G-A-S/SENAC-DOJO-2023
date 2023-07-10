var inserirCPF= document.querySelector("#CPF");
inserirCPF.value= localStorage.getItem("cpf");

let btnEnviar = document.querySelector("#btnEnviar")
btnEnviar.addEventListener('click', function () {
   EnviarProjeto(event);
})

const state = document.querySelector('#estadoProjeto');
const citys = document.querySelector("#cidadeProjeto")
document.addEventListener('DOMContentLoaded',async ()=>
{
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
