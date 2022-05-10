/* pasar a variables los metodos de node. */
const https = require('https');
const fs = require('fs');

/* pasar la url de la api a una variable para utilizar. */
const url = 'https://mindicador.cl/api';


/* variables para recibir los datos enviados desde el archivo childProcess.js. */
/* dentro del objeto “process”, utilizo la propiedad “argv” para almacenar los argumentos de cada proceso. */
/* con el método "slice" recorto el arreglo, omitiendo los primeros 2 elementos. */
/* colocar las posiciones de cada argumento recibido, partiendo desde el cero. */
const argumentos = process.argv.slice(2);
const nom_archivo = (argumentos[0]);
const ext_archivo = (argumentos[1]);
const ind_economico = (argumentos[2]);
const can_pesos = (argumentos[3]);
const fecha = new Date();

/* get es un metodo interno para hacer consultas.  */
/* en el parentesis, el primer paramatro recibe la url de la API. El segundo parametro es un callback en donde estara la respuesta. */
https.get(url, (resp) => {

    /* se crea una variable vacia. */
    let data = '';

    /* chunk captura cada uno de los pedazos o fragmentos de datos que llegaran de la API. Luego los va agregando a la variable data. */
    resp.on('data', (chunk) => {
        data += chunk;
    });

    /* una vez que toda la respuesta ha sido recibida, se muestra el resultado. */
    resp.on('end', () => {

        /* creo una variable y le paso todos los datos que tiene data para que los convierta a formato json. */
        let indicadores = JSON.parse(data);

        /* realizo una prueba imprimiendo los resultados de la variable. */
        //console.log(indicadores);

        /* creo una nueva variable, para relizar el calculo de la conversion de peso a dolar. */
        cambiarDinero = can_pesos / indicadores[`${ind_economico}`].valor;

        /* creo en template con el texto que pedia el desafio, respetando los salto de lineas. */
        let template =`A la fecha: ${fecha} (GMT-04:00) \nFue realizada cotización con los siguientes datos: \nCantidad de pesos a convertir: ${can_pesos} pesos \nConvertido a "${ind_economico}" da un total de: \n$${cambiarDinero.toFixed(2)}`;

        /* utilizo file system para crear el archivo y guardarlo en una carpeta que asigne. */
        /* interpolo la cadena de la ruta de donde se guardara el archivo (path), agregando las variables, el template, el formato de codificacion, y finalmente el callback para manejar el error. */
        fs.writeFile(`cotizaciones/${nom_archivo}.${ext_archivo}`, template, 'utf8', (error) => {
            if (error) {
                console.log("Ha ocurrido un error al crear el archivo.");
            } else {
                console.log("El archivo ha sido creado con exito.");

                /* DATO IMPORTANTE. */
                /* debo agregar el metodo readFile dentro de la condicion true para crear el archivo, ya que si esta afuera, no ejecuta el segundo metodo y aparecer el mensaje de error. */

                /* utilizo file system para leer el archivo creado que esta en la carpeta que asigne. */
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

/* metodo para el manejo de errores. */
}).on('error', (error) => {
    console.log("Se produjo un error en: " + error)
});