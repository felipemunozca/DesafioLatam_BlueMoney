/* child_process es un modulo nativo de node. */
/* sirve para emular una terminal usando código Javascript, para ejecutar una aplicación externa, capturando el mensaje que muestra la consola y usandolo en nuestra aplicación principal. */
const child_process = require('child_process');

/* variables con los valores a utilizar segun lo solicitado en el desafio. */
let nombreArchivo = 'Cotizacion';
let extensionArchivo = 'txt';
let indicadorEconomico = 'dolar';
let cantidadPesos = 250000;

/* exec es un metodo para ejecutar otros archivos o aplicaciones. */
/* interpolo el comando node, junto el archivo main.js y le paso las variables que cree para ser utilizadas en el otro archivo. */
/* despues tengo una funcion como callback que va a capturar un error y un resultado. */
child_process.exec(`node main.js ${nombreArchivo} ${extensionArchivo} ${indicadorEconomico} ${cantidadPesos}`, function(err, result) {
    /* declaro una nueva promesa, que devolvera una respuesta o un rechazo. */
    return new Promise((resolve, reject) => {
        if (err) {
            console.log('Ha ocurrido un error al ejecutar el archivo: ' + nombreArchivo)
            reject();
        } else {
            console.log(result)
            console.log('Programa ejecutado!!')
            resolve();
        }
    })
})