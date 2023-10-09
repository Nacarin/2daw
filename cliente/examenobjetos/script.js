//David Pozo Berlinches
// Andamio para resolver problemas de Acepta el Reto
/*Enunciado
Nuestro sistema va a recibir como datos de entrada un fichero con varias lineas que son las ventas de una empresa,
en cada linea se representa una venta de la empresa,el fichero tiene 3 campos,el primero es la fecha de la venta,la referencia del producto
es el segundo y como tercero el importe,tenemos que crear una funcion que se llama procesarVentas que tiene que recibir el fichero
de texto y tiene que devolver via return un informe de ventas que indique el año,el total de las ventas de ese año
y las referencias vendidas(años 2000-2020),referencias()
Esta separado por tabulaciones(/t) y saltos de linea

Opcion:Devolverlo en un mapa cuya clave sea el numero del año y sus valores objetos con 2 atributos,uno que son la ventas y otro
que son referencias que hay un array de texto con las referencias

Opcion 3:identificar el dia de la semana con mas ventas

Ejemplo
Año 2000: 45200
    Refer: AER-366,AER-407
*/
/*
1*Entrada

Ejemplo de entrada
02/06/15	REF: AER-697	2.962,00 €
10/11/09	REF: AER-525	4.132,00 €
06/02/15	REF: AER-507	3.122,00 €
06/05/10	REF: AER-407	7.869,00 €


Ejemplo de salida
Año 2015: 6084
    Refer:  AER-697,AER-507

*/

console.log('Script cargado correctamente.')

let ficheros = ['test1.txt']

// Carga de ficheros de datos de entrada
ficheros.forEach(fichero=>{
    fetch(fichero) // Carga el fichero
        .then(respuesta=>respuesta.text()) // Obtiene el texto del archivo
        .then(procesarVentas) // Llama a la función1 con el texto
})

function procesarVentas(entrada){

    let lineas=entrada.split('\n')
    let ventasPorAño=new Map()
    let ventasPorDiaSemana=new Map()

    if(lineas.length===0){
        console.log('El archivo está vacío.')
        return
    }

    function getNombreDiaSemana(numeroDia){
        let diasSemana=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]
        return diasSemana[numeroDia]
    }

    lineas.forEach(linea=>{
        if(linea.trim()!==""){
            let partes=linea.split('\t')

            if(partes.length>=3){
                let fechaStr=partes[0]
                let referencia=partes[1].split(': ')[1]
                let importeStr=partes[2].split(' ')[0]
                let importe=parseFloat(importeStr.replace(/\./g, '').replace(',', '.'))
                let año=fechaStr.split('/')[2]
                if(año.length===2){
                    año='20'+año
                }

                try{
                    let fecha=new Date(`${año}-${fechaStr.substring(3, 5)}-${fechaStr.substring(0, 2)}`)

                    año=fecha.getFullYear().toString()

                    if(!ventasPorAño.has(año)){
                        ventasPorAño.set(año,{ventas:0,referencias:[]})
                    }

                    ventasPorAño.get(año).ventas+=importe
                    ventasPorAño.get(año).referencias.push(referencia)

                    let diaSemana=fecha.getDay()

                    if(!ventasPorDiaSemana.has(diaSemana)){
                        ventasPorDiaSemana.set(diaSemana,{ventas:0,referencias:[]})
                    }

                    ventasPorDiaSemana.get(diaSemana).ventas+=importe
                    ventasPorDiaSemana.get(diaSemana).referencias.push(referencia)
                }catch(error){
                    console.log(`Error al analizar la fecha "${fechaStr}" en una de las líneas: ${error.message}`)
                }
            }else{
                console.log(`La línea "${linea}" no tiene el formato correcto.`)
            }
        }
    })

    if(ventasPorAño.size===0){
        console.log('No se encontraron datos válidos en el archivo.')
        return
    }

    ventasPorAño.forEach((valor,clave)=>{
        let ventasFormateadas=valor.ventas.toLocaleString()
        console.log(`Año ${clave}: ${ventasFormateadas}\nRefer: ${valor.referencias.join(',')}\n`)
    })
    
    let diaMasVentas=[...ventasPorDiaSemana.entries()].reduce((max, entry)=>entry[1].ventas>max[1].ventas?entry:max)
    let ventasFormateadas=diaMasVentas[1].ventas.toLocaleString()

    console.log(`Día de la semana con más ventas: ${getNombreDiaSemana(diaMasVentas[0])} (Ventas: ${ventasFormateadas})`)
}
