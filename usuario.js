class Usuario {
    constructor(nom,ape,dni,fechaNac,email,exTtel,tel,pass,points){
        this.nom = nom;
        this.ape = ape;
        this.dni = dni;
        this.fechaNac = fechaNac;
        this.email = email;
        this.exTtel = exTtel;
        this.tel = tel;
        this.pass = pass;
        this.points = points;
    }

    get nombre(){
        return this.nom;
    }

    set nombre(nom){
         this.nom = nom;
    }

    get apellido(){
        return this.ape;
    }

    set apellido(ape){
        this.ape = ape;
    }

    get documentoIden(){
        return this.dni;
    }

    set documentoIden(dni){
        this.dni = dni;
    }

    get fechaNacimiento(){
        return this.fechaNac;
    }

    set fechaNacimiento(fechaNac){
        this.fechaNac = fechaNac;
    }

    get correo(){
        return this.email;
    }

    set correo(email){
        this.email = email;
    }

    get telefono(){
        return this.tel;
    }

    set telefono(tel){
        this.tel = tel;
    }

    get extTelefono(){
        return this.tel;
    }

    set extTelefono(exTtel){
        this.exTtel = exTtel;
    }

    get password(){
        return this.tel;
    }

    set password(pass){
        this.pass = pass;
    }

    get dPoints(){
        return this.points;
    }

    set dPoints(points){
        this.points = points;
    }

    comprobarPassword(password){
        return this.pass==password;  
    }

   fromJsonToUsuario(json){
        return Object.assign(this, json);
   }

   devolverAtributo(atributo){
        var valor = "";
        switch (atributo) {
            case "nombre":
                
                valor = this.nom;
                break;
            case "apellido":
                valor = this.ape;
                break;
            case "dni":
                valor = this.dni;
                break;
            case "fechaNac":
                valor = this.fechaNac;
                break;
            case "email":
                valor = this.email;
                break;
            case "extension":
                valor = this.exTtel;
                break;
            case "telefono":
                valor = this.tel;
                    break; 
            default:
                break;
        }

        return valor;
   }

   guardarAtributo(atributo,valor){
        switch (atributo) {
            case "nombre":
                this.nom = valor;
                break;
            case "apellido":
                this.ape = valor;
                break;
            case "dni":
                this.dni = valor;
                break;
            case "fechaNac":
                this.fechaNac = valor;
                break;
            case "email":
                this.email = valor;
                break;
            case "extension":
                this.exTtel = valor;
                break;
            case "telefono":
                this.tel = valor;
                break;    
            default:
                break;
        }
    }
}

class Usuarios{
    constructor(){
        this.usuarios = [];
    }
    
    //comprueba si el usuario ya existe (se comprueba por el correo)
    existeUsuario(email) {
        var existe = false;
        var key = 0;
        var usuarios = this.usuarios;
        var usuario = null;
    
        while (!existe && key < usuarios.length) {
            if (usuarios[key].email == email) {
                existe = true;
                usuario = usuarios[key];
            }
            key++
        }
        return usuario
    }
    
    //añade un usuario
    añadirUsuario(usuario){
        this.usuarios.push(usuario);
    }

    //devuelva la posicion donde está el usuario
    buscarUsuario(usuario){
        var existe = false;
        var key = 0;
        var usuarios = this.usuarios;

        while (!existe && key < usuarios.length) {
            if (usuarios[key].email == usuario.email) {
                var position = key;
            }
            key++
        }
        return position
    }    
    
    //Modifica los datos personales del suario
    modificarDatosPersonales(usuario, posicion){
        this.usuarios[posicion].nom = usuario.nom;
        this.usuarios[posicion].ape = usuario.ape;
        this.usuarios[posicion].dni = usuario.dni;
        this.usuarios[posicion].fechaNac = usuario.fechaNac;
        this.usuarios[posicion].email = usuario.email;
        this.usuarios[posicion].exTtel = usuario.exTtel;
        this.usuarios[posicion].tel = usuario.tel;
    }

    modificarPassword(usuario, posicion){
        this.usuarios[posicion].pass = usuario.pass;
    }

    guardarUsuarios(){
        localStorage.setItem("usuarios", JSON.stringify(this.usuarios))
    }

    fromJsonToUsuarios(json){
        return Object.assign(this, json);
   }
}

class Sesion{
    constructor(estado, usuario){
        this.estado = estado;
        this.usuario = usuario;
    }

    get estadoSesion() {
        return this.estado
    }

    set estadoSesion(estado) {
        this.estado = estado;
    }

    get usuarioSesion() {
        return this.usuario;
    }

    set usuarioSesion(usuario) {
        this.usuario = usuario;
    }

    cerrarSesion(){
        this.estado = "close";
        this.usuario = null;
    }

    guardarSesion(){
        localStorage.setItem("sesion",JSON.stringify(this))
    }

    fromJsontoSesion(json){
        return Object.assign(this, json);
   }
}

function inicializacion(){
    var usuarios = new Usuarios();
    var user = new Usuario("elena","mederos","54058798N","18-02-1991","elena@gmail.com","+34","686246095", "password",3000);
    var user2 = new Usuario("carlos","mederos","54058798N","18-02-1991","carlos@gmail.com","+34","686246095", "password",200);
    usuarios.añadirUsuario(user2);
    usuarios.añadirUsuario(user);
    // Quería usar el usuarios.guardarUSuarios(), pero si lo usaba no me debaja iniciar sesión.. por qué? No lo he descubierto
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
    deshabilitarEdicion();
    document.getElementById("defaultOpen").click();
}

//Muestra un mensaje de error por el console.log
function mostrarMensaje(mensaje){
    console.log(mensaje);
}

function sesionFromLocalStorage(){
    var sesionJSON = JSON.parse(localStorage.getItem("sesion"));
    var sesion = new Sesion();
    sesion = sesion.fromJsontoSesion(sesionJSON);

    return sesion;
}

function usuariosFromLocalStorage(){
    var usuariosJSON = JSON.parse(localStorage.getItem("usuarios"));
    var usuarios = new Usuarios();
    usuarios = usuarios.fromJsonToUsuarios(usuariosJSON);

    return usuarios;
}

function usuarioFromSesion(sesion){
    var usuarioJSON = sesion.usuario;
    var usuario = new Usuario();
    usuario = usuario.fromJsonToUsuario(usuarioJSON);
    return usuario;
}

//Comprueba si el usuario existe y si la contraseña es correcta, si es así inicia sesión.
//Iniciar sesión consiste en guardar un objeto de la clase sesion en el localStorage con 
//el estado = open y usuario = al usuario que se haya logueado
function iniciarSesion(){
    // var email = document.getElementById("email-input").value;
    // var password = document.getElementById("password-input").value;
    var email = "elena@gmail.com";
    var password = "password";

    var usuarios = usuariosFromLocalStorage();

    var usuarioJSON = usuarios.existeUsuario(email);
    var usuario = new Usuario();
    usuario = usuario.fromJsonToUsuario(usuarioJSON);
    if (usuario){
        if (usuario.comprobarPassword(password)){
           var sesion = new Sesion("open", usuario);
           sesion.guardarSesion();
           mostrarDatos();
        }else{
            var mensaje = "Login incorrecto";
            mostrarMensaje(mensaje);
        }
    }else{
        var mensaje = "No existe cuenta creada con ese email";
        mostrarMensaje(mensaje);
    }
}

//Cierra la sesion, es decir estado= close y el usuario = null. Luego la guarda en el localStorage.
function cerrarSesion(){
    var sesion = sesionFromLocalStorage();
    sesion.cerrarSesion();
    sesion.guardarSesion();
}

function mostrarDatos(){
    var sesion = sesionFromLocalStorage();
    var usuario = usuarioFromSesion(sesion);
    var inputs = document.querySelectorAll(".info-personal-input");
    inputs.forEach(input => {
        document.querySelector(`#${input.id}`).value = usuario.devolverAtributo(input.id);
    })
}

function guardarDatosEnLocalStorage(usuarios,usuario,sesion,tipoDato){
        //actualiza el usuario de la sesion
        sesion.usuario = usuario;
        sesion.guardarSesion();
        //actualizar el array de usuarios --> puedo buscar el usuario y luego modificarlo con las funciones que ya tengo pensadas arriba
        console.log(usuarios.buscarUsuario(usuario));
        tipoDato == "personales" ? usuarios.modificarDatosPersonales(usuario, usuarios.buscarUsuario(usuario)) : usuarios.modificarPassword(usuario, usuarios.buscarUsuario(usuario));
        
        usuarios.guardarUsuarios();
}

function guardarDatos(){
    var sesion = sesionFromLocalStorage();
    //CAMBIAR LA CLASE PARA QUE COJA EL SELECT TB!!!!!
    var datos = document.querySelectorAll(".info-personal-input");
    var usuario = usuarioFromSesion(sesion);
    var usuarios = usuariosFromLocalStorage();
    datos.forEach( input => {
        if (input.value != "" && input.value !=usuario.devolverAtributo(input.id)){
            //guardar los cambios del usuarios atributo por atributo
            usuario.guardarAtributo(input.id, input.value);
        }
    });

    guardarDatosEnLocalStorage(usuarios,usuario,sesion,"personales");
}

function guardarContraseña(){
    var sesion = sesionFromLocalStorage();
    var usuario = usuarioFromSesion(sesion);
    var usuarios = usuariosFromLocalStorage();
    var contraseñaNueva = document.querySelector("#nuevaPassword.pass-input").value;
    var contraseñaActual = document.querySelector("#password.pass-input").value;
    if (usuario.comprobarPassword(contraseñaActual)){
        if (usuario.comprobarPassword(contraseñaNueva)){
            var mensaje = "La contraseña nueva no puede ser igual a la anterior";
            mostrarMensaje(mensaje);
        }else{
            usuario.pass = contraseñaNueva;
            guardarDatosEnLocalStorage(usuarios,usuario,sesion,"password");
        }
    }else{
        var mensaje = "La contraseña actual no coincide";
        mostrarMensaje(mensaje);
    }
}

//Cambia el contenido que se muestra
function openContent(evt, id) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(id).style.display = "block";
    evt.currentTarget.className += " active";
  }
 
function habilitarEdicion(){
    var inputs = document.querySelectorAll(".info-personal-input");
    inputs.forEach(input => {
        input.readOnly = false;
    });   
}

function deshabilitarEdicion(){
    var inputs = document.querySelectorAll(".info-personal-input");
    inputs.forEach(input => {
        input.readOnly = true;
    });   
}

 
  // Get the element with id="defaultOpen" and click on it
inicializacion();
