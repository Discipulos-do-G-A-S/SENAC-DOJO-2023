const enviar=document.getElementById("cadastrar");
enviar.addEventListener('click',cadastrar);
function cadastrar(){
event.preventDefault();
let cargo=document.getElementsByName("cargo");//pegar todos os radios
let cargoSelecionado=0;//será usado para salvar o resultado do cargo selecionado nos radios
let nome= document.getElementById("nome").value;
let email= document.getElementById("email").value;
let cpf= document.getElementById("cpf").value;
let senha= document.getElementById("senha").value;
cargo.forEach(valor => {//percorrer os radios
    if(valor.checked){//verificar se esta selecionado
        cargoSelecionado=valor.value;//colocar o valor se estiver marcado(1 e 2 são cargos validos)
    }
});
if(cargoSelecionado==0 || nome=="" || email=="" || cpf=="" || senha==""){
alert("Algum campo esta incompleto, favor completar tudo antes de enviar.")
}
else{
    //enviar para o controller
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('email', email);
    formData.append('cpf', cpf);
    formData.append('senha', senha);
    formData.append('cargo', cargoSelecionado);

    // Criar a requisição XHR
    const xhr = new XMLHttpRequest();

    // Configurar a requisição
    xhr.open('POST', 'http://localhost/senac-dojo-2023/controllers/controllerUser.php', true);
    
    // Definir o callback para quando a requisição estiver concluída
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Sucesso na requisição
        alert("Cadastro realizado com sucesso!");
      } else {
        // Erro na requisição
        alert("Erro ao cadastrar. Tente novamente mais tarde.");
      }
    };

    // Enviar a requisição com os dados do FormData
    xhr.send(formData);
}
}