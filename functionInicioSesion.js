/*
Archivo para definir las funciones usadas en el inicio de sesión
Páginas que usan este documento JavaScript
    inicioSesion.html
*/ 

const elementoFormulario = document.getElementById('formularioInicio');
const elementoEmail = document.getElementById('txtEmail');
const elementoPassword = document.getElementById('txtPassword');

const regexEmail = new RegExp(".*@(gmail.com|profesor.duoc.cl|duoc.cl)");

elementoFormulario.addEventListener( 'submit' , (event)=>{
    intentarInicioSesion();
} )

function intentarInicioSesion(){
    let mensajesErrores = [];
    if(elementoEmail.value==='' || elementoEmail.value==null){
        mensajesErrores.push("Email requerido");
    }
    if(!regexEmail.test(elementoEmail.value)){
        mensajesErrores.push("Email no aceptado");
    }
    if(elementoPassword.value.length<4 || elementoPassword.value.length>10){
        mensajesErrores.push("Contraseña debe tener un largo entre 4 a 10 caracteres");
    }

    if(mensajesErrores.length>0){
        M.toast({ html: mensajesErrores.join(' / ') });
        event.preventDefault();
    }else{
        M.toast({ html: "Sesion iniciada de " + elementoEmail.value });
        elementoEmail.value = '';
        elementoPassword.value = '';
    }
}