// Initialize Firebase
const firebaseConfig = {
   apiKey: "AIzaSyDbJkjHpLfcgbItvzmGsPB2jA4nr4jlJgQ",
   authDomain: "projeto-somar.firebaseapp.com",
   projectId: "projeto-somar",
   storageBucket: "projeto-somar.appspot.com",
   messagingSenderId: "94713736245",
   appId: "1:94713736245:web:ff0b13d0a825308dfed57c"
 };
firebase.initializeApp(firebaseConfig);
btnEnviarImagem = document.querySelector("#btnEnviarImagem");
btnEnviarImagem.addEventListener('click', function(event) {
   uploadImage(event);
 });
function uploadImage() {
   event.preventDefault();
   let input= document.getElementById("photo");//linkagem de variavel com o input de fotos e videos
   const arquivos = input.files;//linkagem diretamente com os arquivos do input
   for (let i = 0; i < arquivos.length; i++) {//for para percorrer todo o input
      const arquivo = arquivos[i];//const que recebe arquivo por arquivo
      const tipo = arquivo.type;//const que recebe o tipo do arquivo para fazer a verificação
  
      if (tipo.startsWith('video/') || tipo.startsWith('image/')) {//verificação de se o arquivo especifico é video ou imagem
      } else {//else caso arquivo não seja imagem ou video, ele da um alerta, reseta o input e termina a função
        alert("Tipo de arquivo inválido");
        input.value = ''; // Limpar a seleção do arquivo
        return; // Terminar a função
      }
    }
   // Get a reference to the storage service
   var storage = firebase.storage();
   const ref = firebase.storage().ref();
   // Create a reference to the folder you want to create
   let nomePasta = document.querySelector('#nomeProjeto').value;
   console.log(nomePasta);
   if(nomePasta == null || nomePasta == "")
   {
      alert('adcione nome para o projeto');
      nomePasta.focus();
   }
   else{   
   var folderRef = storage.ref().child(nomePasta);
   let arquivos= Array.from(input.files);
   for (let i = 0; i < arquivos.length; i++) {
      var photoFile = arquivos[i];
      var photoRef = folderRef.child(photoFile.name);
      photoRef.put(photoFile).then(function(snapshot) {
      })
      alert("arquivos enviados para -> "+folderRef)
   }
}
}
