function inicializacion(){
    var usuarios = new Usuarios();
    var user = new Usuario("elena","mederos","54058798N","18-02-1991","elena@gmail.com","+34","686246095", "password",7000);
    var user2 = new Usuario("carlos","mederos","54058798N","18-02-1991","carlos@gmail.com","+34","686246095", "password",200);
    usuarios.añadirUsuario(user2);
    usuarios.añadirUsuario(user);
    // Quería usar el usuarios.guardarUSuarios(), pero si lo usaba no me debaja iniciar sesión.. por qué? No lo he descubierto
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
    deshabilitarEdicion();
   
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
        mostrarMensaje("La contraseña actual no coincide");
    }
}

//habilita la escritura en los inputs
function habilitarEdicion(){
    var inputs = document.querySelectorAll(".info-personal-input");
    inputs.forEach(input => {
        input.readOnly = false;
    });   
}

//deshabilita la escritura en los inputs
function deshabilitarEdicion(){
    var inputs = document.querySelectorAll(".info-personal-input");
    inputs.forEach(input => {
        input.readOnly = true;
    });   
}

//pinta la gráfica de los daviniair points
function pintarGrafica () {
    var sesion = sesionFromLocalStorage();
    var usuario = usuarioFromSesion(sesion);
    var points = usuario.points;
    var noPoints = 10000 - usuario.points;
    
    const labels = [
        'Daviniair points por conseguir','Daviniair points'
      ];
    
      const data = {
        labels: labels,
        datasets: [{
          label: 'My First dataset',
          backgroundColor: ["#fff",'#2e2e5c'],
          data: [noPoints, points,],
        }]
      };
    
      const config = {
        type: 'doughnut',
        data: data,
        options: {}
      };

      var myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
    document.getElementById("mostrarPoints").innerHTML = `<p>Tienes ${points} Davinair points</p>`
}

document.getElementById("defaultOpen").click();
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
 

// inicializacion();
mostrarDatos();
pintarGrafica ();
