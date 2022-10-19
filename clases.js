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
