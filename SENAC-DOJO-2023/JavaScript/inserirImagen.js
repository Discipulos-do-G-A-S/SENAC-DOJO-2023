// Initialize Firebase
const firebaseConfig = {
   apiKey: "AIzaSyDyZVF1WDjTLkKcnDhz1e-wKGVOl9g5Hn8",
   authDomain: "teste-170423.firebaseapp.com",
   projectId: "teste-170423",
   storageBucket: "teste-170423.appspot.com",
   messagingSenderId: "564787693295",
   appId: "1:564787693295:web:c7e7590016eace397cbd1a",
   measurementId: "G-D5Q69CPL1D"
};
firebase.initializeApp(firebaseConfig);
function uploadImage() {
   // Get a reference to the storage service
   var storage = firebase.storage();
   const ref = firebase.storage().ref();
   // Create a reference to the folder you want to create
   let nomePasta = document.querySelector('#nomeProjeto').value;
   console.log(nomePasta);
   if(nomePasta == null)
   {
      alert('adcione nome para o projeto');
   }
   else{   
   var folderRef = storage.ref().child(nomePasta);
   let input= document.getElementById("photo");
   let arquivos= Array.from(input.files);

   for (let i = 0; i < arquivos.length; i++) {
      var photoFile = arquivos[i];
   var photoRef = folderRef.child(photoFile.name);
      photoRef.put(photoFile).then(function(snapshot) {
        console.log('Photo uploaded successfully!');
      })
      
   }
   
   // Create the folder
   /*folderRef.put(document.querySelector("#photo").files[0]).then(function (snapshot) {
      console.log('Folder created successfully!');
      // Generate a media key for the folder
      folderRef.getMetadata().then(function (metadata) {
         console.log('Media key for the folder:', metadata.fullPath);
         // Upload 5 photos inside the folder
         
      }).catch(function (error) {
         console.error('Error getting metadata:', error);
      });
   }).catch(function (error) {
      console.error('Error creating folder:', error);
   });*/
}
}
function acessJson() {
   fetch('../json/dadosProjeto.json')
     .then(response => response.json())
     .then(data => {
       const selectedData = data.filter(item => item['ods'] === '11');
       selectedData.forEach(item => {
         console.log(item.nomeProjeto);
       });
     })
     .catch(error => console.error(error))}
