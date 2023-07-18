var urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");
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
const storage = firebase.storage();
const folder = storage.ref(id);
//linkar o carroussel e o iframe com const
const imgs= document.getElementsByClassName("changeImg");
const video= document.getElementById("changeVideo");
let countImg=0;
folder.listAll()
  .then(function(res) {
    // A lista de itens na pasta
    var items = res.items;

    // Iterar sobre os itens para obter as informações desejadas
    items.forEach(function(item) {
      // Aqui é para lidar com cada item separadamente
      item.getMetadata().then(function(metadata) {
        // Obtendo o tipo do arquivo
        const contentType = metadata.contentType;
    
        // Verificar o tipo para determinar se é uma imagem ou um vídeo
        if (contentType.startsWith("image/")) {
          // É uma imagem
          item.getDownloadURL()
  .then(function(url) {//pegar a url da imagem em especifico
    if(countImg<5){//if para evitar que de comandos para locais do carroussel que n existam
    imgs[countImg].src=url;//colocar a imagem em uma posição do carroussel
    countImg++;
  }
  
  })
  .catch(function(error) {
    // Ocorreu um erro ao obter a URL do item
  });
        } 
        else if (contentType.startsWith("video/")) {
          // é um video
          item.getDownloadURL()
  .then(function(url) {//pegar a url do video em especifico
    console.log("link do video: "+url);
  video.src=url; //inserir o video no iframe
  })
  .catch(function(error) {
    // Ocorreu um erro ao obter a URL do item
  });
        }
      }).catch(function(error) {
        console.error("Erro ao obter metadados do arquivo:", error);
      });
    });
  })
  .catch(function(error) {
    // Ocorreu um erro ao obter a lista de itens
  });



  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost/senac-dojo-2023/controllers/controllerShowProject.php?id=" + id, true);
  xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log("teste");
    let response = JSON.parse(xhr.responseText);
    console.log(response);
    if (response.length == 0) {
      alert("Nenhum dado encontrado");
    } else {
      //linkar os elementos html em variaveis
      const nome= document.getElementById("projeto");
      const cidade=document.getElementById("cidade");
      const causa=document.getElementById("causa");
      const objetivo=document.getElementById("objetivo");
      const parceiros=document.getElementById("parceiros");
      const ods=document.getElementById("ods");
      //aqui se coloca os comandos para inserir os dados no html
      nome.innerText=response[0].nome_projeto;
      cidade.innerText=response[0].cidade_projeto+"/"+response[0].estado_projeto;
      causa.innerText=response[0].objetivo_projeto;
      objetivo.innerText=response[0].descricao_projeto;
      //a partir daqui é para ver e inserir a quantidade de parceiros e ods
      //parceiros
      let counterPartners=-1;
      let counterOds=-1;
      let textPartners;
      let textOds;
      for (let i = 0; i < response.length; i++) {
        if(response[i].nome_parceiro==null||response[i].nome_parceiro==""){//verificar se esta vazio o parceiro esta vazio
        }
        else{
          if(i==0){counterPartners=0;}//apenas para zerar o valor
          counterPartners++;//adicionar ao valor do contador que tem um valor valido de parceiro
        }

        if(response[i].nome_ods==null||response[i].nome_ods==""){//verificar se esta vazio a ods
        }
        else{
          if(i==0){counterOds=0;}//apenas para zerar o valor
          counterOds++;//adicionar ao valor do contador que tem um valor valido de ods
        }
      }
      
      for(let i=0;i<response.length; i++){//for para inserir os dados do parceiro e ods(apenas os validos) e estruturar o texto com ",", "e" e "."
      //primeiro parceiro
        if(counterPartners==-1){
        textPartners="Este Projeto não possui parceiros";
      }
      else if(i==0){
        textPartners=response[i].nome_parceiro;
      }
      else if(i==counterPartners){
        textPartners+=" e "+response[i].nome_parceiro;
      }        
      else if(i<counterPartners){
        textPartners+=", "+response[i].nome_parceiro;
      }
      
      //agora as ods
      if(counterOds==-1){
        textOds="Este Projeto não possui parceiros";
      }
      else if(i==0){
        textOds=response[i].nome_ods;
      }
      else if(i==counterOds){
        textOds+=" e "+response[i].nome_ods;
      }        
      else if(i<counterOds){
        textOds+=", "+response[i].nome_ods;
      }
      }//fim for
      textPartners+=".";
      textOds+=".";
      
     parceiros.innerText=textPartners;
     ods.innerText=textOds;

    }
  }
}
  xhr.send();
  