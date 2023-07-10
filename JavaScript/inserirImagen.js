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









btnEnviarImagem = document.querySelector("#btnEnviarImagem");
btnEnviarImagem.addEventListener('click', function(event) {
   uploadImage(event);
 });






 


function uploadImage() {
   event.preventDefault();
   let input= document.getElementById("photo");//linkagem de variavel com o input de fotos e videos
   const files = input.files;//linkagem diretamente com os arquivos do input
   let fileFiles= Array.from(input.files);
   for (let i = 0; i < files.length; i++) {//for para percorrer todo o input
      const file = fileFiles[i];//const que recebe arquivo por arquivo
      const type = file.type;//const que recebe o tipo do arquivo para fazer a verificação
  
      if (type.startsWith('video/') || type.startsWith('image/')) {//verificação de se o arquivo especifico é video ou imagem
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
   let folderName = document.querySelector('#nomeProjeto').value;
   console.log(folderName);
   if(folderName == null || folderName == "")
   {
      alert('adcione nome para o projeto');
      document.querySelector('#nomeProjeto').focus();
   }
   else{   
   var folderRef = storage.ref().child(folderName);
    fileFiles= Array.from(input.files);
   for (let i = 0; i < fileFiles.length; i++) {
      var photoFile = fileFiles[i];
      var photoRef = folderRef.child(photoFile.name);
      photoRef.put(photoFile).then(function(snapshot) {
      })
      alert("arquivos enviados para -> "+folderRef)
   }
}
}
