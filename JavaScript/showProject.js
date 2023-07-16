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
  .then(function(url) {
  //coloque aqui os comandos necessarios para inserir a imagem
  console.log("o link a seguir é de imagem:");
  console.log(url);
  })
  .catch(function(error) {
    // Ocorreu um erro ao obter a URL do item
  });
        } 
        else if (contentType.startsWith("video/")) {
          // é um video
          item.getDownloadURL()
  .then(function(url) {
  //coloque aqui os comandos necessarios para inserir o video
  console.log("o link a seguir é de video:");
  console.log(url);
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