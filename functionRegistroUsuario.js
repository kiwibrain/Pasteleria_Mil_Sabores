/*
Archivo para definir las funciones usadas en el registro de usuario
Páginas que usan este documento JavaScript
    registroUsuario.html
*/ 

const elementoFormulario = document.getElementById('formularioRegistro');
const elementoNombre = document.getElementById('txtNombre');
const elementoApellido = document.getElementById('txtApellido');
const elementoEdad = document.getElementById('numEdad');
const elementoEmail = document.getElementById('txtEmail');
const elementoPassword = document.getElementById('txtPassword');
const elementoPassConfirm = document.getElementById('txtPassConfirm');

const regexEmail = new RegExp(".*@(gmail.com|profesor.duoc.cl|duoc.cl)");

elementoFormulario.addEventListener( 'submit' , (event)=>{
    intentarRegistrarUsuario();
} )

function intentarRegistrarUsuario(){
    // console.log("Flag Inicio");
    // console.log("!regexEmail.test(elementoEmail.value) : " + !regexEmail.test(elementoEmail.value))
    let mensajesErrores = [];
    if(elementoNombre.value==='' || elementoNombre.value==null){
        mensajesErrores.push("Nombre requerido");
    }
    if(elementoNombre.value.length>100){
        mensajesErrores.push("Nombre demasiado largo");
    }
    if(elementoApellido.value==='' || elementoApellido.value==null){
        mensajesErrores.push("Apellido requerido");
    }
    if(elementoApellido.value.length>100){
        mensajesErrores.push("Apellido demasiado largo");
    }
    if(elementoEdad.value<=0 || elementoEdad.value>110 || elementoEdad.value==null){
        mensajesErrores.push("Edad no aceptada");
    }
    if(elementoEmail.value==='' || elementoEmail.value==null){
        mensajesErrores.push("Email requerido");
    }
    if(!regexEmail.test(elementoEmail.value)){
        mensajesErrores.push("Email no aceptado");
    }
    if(elementoPassword.value.length<4 || elementoPassword.value.length>10){
        console.log("elementoPassword.value: " + typeof(elementoPassword.value) + " : " + elementoPassword.value)
        mensajesErrores.push("Contraseña debe tener un largo entre 4 a 10 caracteres");
    }
    if(elementoPassword.value !== elementoPassConfirm.value){
        mensajesErrores.push("Contraseña es diferente en ambos campos");
    }
    if(mensajesErrores.length>0){
        M.toast({ html: mensajesErrores.join(' / ') });
        event.preventDefault();
    }else{
        M.toast({ html: "Registrado usuario " + elementoNombre.value });    
    }
    // console.log("Flag Final");
}