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
   var photoFile = document.querySelector("#photo").files[0];
   var photoRef = folderRef.child(photoFile.name);
      photoRef.put(photoFile).then(function(snapshot) {
        console.log('Photo uploaded successfully!');
      })
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
   let request = new XMLHttpRequest();
   request.open('GET', '../json/dadosProjeto.json', true);
   request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
         let data = JSON.parse(request.responseText);
         console.log(data);
         // faça algo com os dados aqui
      } else {
         console.error('Erro ao buscar arquivo JSON');
      }
   };
   request.onerror = function () {
      console.error('Erro de conexão');
   };
   request.send();
}
"use strict";

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

function start() {
   pause();
   cron = setInterval(() => { timer(); }, 10);
}

function pause() {
   clearInterval(cron);
}
function timer() {
   if ((millisecond += 10) == 1000) {
      millisecond = 0;
      second++;
   }
   if (second == 60) {
      second = 0;
      minute++;
   }
   if (minute == 60) {
      minute = 0;
      hour++;
   }
   document.getElementById('hour').innerText = returnData(hour);
   document.getElementById('minute').innerText = returnData(minute);
   document.getElementById('second').innerText = returnData(second);
   document.getElementById('millisecond').innerText = returnData(millisecond);
}

function returnData(input) {
   return input > 10 ? input : `0${input}`
}

