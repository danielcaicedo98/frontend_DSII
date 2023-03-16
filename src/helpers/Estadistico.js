import { useEffect, useState } from "react";
import { fetchWithToken } from "api/fetch";

var myData = []

export const  newUsers = (datos) => {

    let newUsers = filtrarDatos(fechaInicioMes(new Date()),fechaActual(new Date()),datos).length
    return newUsers
}

export const newContract = (contract,date) =>{

    let contractMont = 0;
   
    contract.forEach(element => {       
        console.log(formatDate(element.fecha_instalacion) > date) 
        element.fecha_instalacion=formatDate(element.fecha_instalacion)
        if(element.fecha_instalacion > date){
            contractMont = contractMont + 1;
        }
    });
    return contractMont

}

export const routeReport = (value) => {
    let route = `reportes/clientes/informacion_financiera/?`
    if(value.created__gte !== ''){
        
        if(value.created__lte !== '' || value.contratos !== ''){
            route = route + `created__gte=${value.created__gte}&`
        }else{
            route = route + `created__gte=${value.created__gte}`
        }
    }if(value.created__lte!== ''){
        if(value.clientes !== '' || value.contratos !== ''){
            route = route + `created__lte=${value.created__lte}&`
        }else{
            route = route + `created__lte=${value.created__lte}`
        }
        
    } if(value.clientes !== ''){
        if(value.contratos !== ''){
            route = route + `clientes=${value.clientes}&`
        }else
        {route = route + `clientes=${value.clientes}`}
    }if(value.contratos !== ''){
        route = route + `contratos=${value.contratos}`

    }
    return route

}

export const valuePaidMonth =(values) =>{
    let statistics = {
        prof: '',
        rem: ''
    }
    let profit = 0;
    let remaining = 0;
    values.map((value) =>{
        if(value.estado.label == 'PAGADA'){
            profit = profit+value.total_a_pagar
        }else if(value.estado.label == 'PENDIENTE'){
            remaining = remaining+value.total_a_pagar
        }
    })
    profit = redondear((profit*0.000001),2)
    remaining = redondear((remaining*0.000001),2)
    statistics.prof = "$ "+profit + " M"
    statistics.rem = "$ "+remaining + " M"
    return statistics
}


 

 export  function Load  (data) {
   //data[0].prueba = "hola"

    const [values,setValues] = useState({
        lng: 0,
        lat:0
      })
      useEffect(() =>{
        async function load(){
            const response = await fetchWithToken(`contratos/?cliente=${data[0].id}`);
            let body = await response.json();
            setValues({
                lng: body[0].longitud,
                lat: body[0].latitud
              })  
        }
        load()
      },[])
                   
      console.log(data)
   }


export const  FullValueYear = (year,day,values) => {

    let date = new Date()
    
    let valuePerMonth = [0,0,0,0,0,0,0,0,0,0,0,0,0]  
    values.map((value1,index1) =>{       
        values.map((value2) =>{
            
            if(value2.fecha_expedicion === (year + '-0'+ (index1) +'-' + day)
                                                && value2.estado.label == 'PAGADA'
                                                    && ((index1) <=9)){
                                                        
                        valuePerMonth[index1] = (valuePerMonth[index1]+value2.total_a_pagar)                        
            }else if(value2.fecha_expedicion === (year + '-'+ (index1) +'-' + day)
                        && value2.estado.label == 'PAGADA'
                            && ((index1) >=9)){
                        valuePerMonth[index1] = (valuePerMonth[index1]+value2.total_a_pagar)                        
                    }
        })
    })

    
    valuePerMonth.map((value,index) =>{
        valuePerMonth[index] = redondear((valuePerMonth[index]*0.000001),2)
    })  
    return valuePerMonth
}


export const  profitMonth = (year,day,values) => {

    let date = new Date()
    
    let valuePerMonth = [0,0,0,0,0,0,0,0,0,0,0,0,0]  
    values.map((value1,index1) =>{       
        values.map((value2) =>{
            
            if(value2.fecha_expedicion === (year + '-0'+ (index1) +'-' + '01')
                                                && value2.estado.label == 'PAGADA'
                                                    && ((index1) <=9)){
                                                        
                        valuePerMonth[index1] = (valuePerMonth[index1]+value2.total_a_pagar)                        
            }else if(value2.fecha_expedicion === (year + '-'+ (index1) +'-' + '01')
                        && value2.estado.label == 'PAGADA'
                            && ((index1) >=9)){
                        valuePerMonth[index1] = (valuePerMonth[index1]+value2.total_a_pagar)                        
                    }
        })
    })

    
    valuePerMonth.map((value,index) =>{
        valuePerMonth[index] = redondear((valuePerMonth[index]*0.000001),2)
    })  
    return valuePerMonth
}

export const chartData =(values) =>{    
      return {
        labels: ['','Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
          {
            label: "Performance",
            data: values
          }
        ]
      };
    
  }

function redondear(numero, decimales) {
    if (typeof numero != 'number' || typeof decimales != 'number') {
        return null;
    }

    let signo = numero >= 0 ? 1 : -1;

    return (Math.round((numero * Math.pow(10, decimales)) + (signo * 0.0001)) / Math.pow(10, decimales)).toFixed(decimales);
}




export const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


export const fechaInicioMes =(fecha) => {
    return formatDate(new Date(fecha.getFullYear(), fecha.getMonth(),1))
}

export const expeditionDate = (date,day) => {
    return formatDate(new Date(date.getFullYear(), date.getMonth(),day))
}

export const expeditionDatePerMonth = (date,day) => {
    return formatDate(new Date(date.getFullYear(), date.getMonth(),day))
}

export const fechaInicioAnio =(fecha) => {
    return formatDate(new Date(fecha.getFullYear(), 0,1))
}

export const fechaActual =() => {
    return formatDate(new Date())
}

function filtrarDatos(fechaInicio,fechaFin,datos){

    let datosFiltrados = []
    datos.map((dato) =>{
        dato.created = formatDate(dato.created)
        if(fechaInicio <= dato.created
            && fechaFin >= dato.created){
                datosFiltrados.push(dato)
        }
    })



    return datosFiltrados
}
