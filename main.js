
const https = require('https');
const fs = require('fs');

const url = 'https://mindicador.cl/api';

const argumentos = process.argv.slice(2);
const nom_archivo = (argumentos[0]);
const ext_archivo = (argumentos[1]);
const ind_economico = (argumentos[2]);
const can_pesos = (argumentos[3]);
const fecha = new Date();

https.get(url, (resp) => {

    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {

        let indicadores = JSON.parse(data);

        cambiarDinero = can_pesos / indicadores[`${ind_economico}`].valor;

        let template =`A la fecha: ${fecha} (GMT-04:00) \nFue realizada cotización con los siguientes datos: \nCantidad de pesos a convertir: ${can_pesos} pesos \nConvertido a "${ind_economico}" da un total de: \n$${cambiarDinero.toFixed(2)}`;

        fs.writeFile(`cotizaciones/${nom_archivo}.${ext_archivo}`, template, 'utf8', (error) => {
            if (error) {
                console.log("Ha ocurrido un error al crear el archivo.");
            } else {
                console.log("El archivo ha sido creado con exito.");

                fs.readFile(`cotizaciones/${nom_archivo}.${ext_archivo}`, "utf8", (error) => {
                    if (error) {
                        console.log("Ha ocurrido un error al leer el archivo.");
                    } else {
                        console.log(template);
                    }
                });
            }
        });

    })

}).on('error', (error) => {
    console.log("Se produjo un error en: " + error)
});