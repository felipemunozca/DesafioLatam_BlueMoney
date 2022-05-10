const child_process = require('child_process');

let nombreArchivo = 'Cotizacion';
let extensionArchivo = 'txt';
let indicadorEconomico = 'dolar';
let cantidadPesos = 250000;

child_process.exec(`node main.js ${nombreArchivo} ${extensionArchivo} ${indicadorEconomico} ${cantidadPesos}`, function(err, result) {
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