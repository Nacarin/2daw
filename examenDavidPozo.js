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
