import { fetchWithToken } from "api/fetch"
import axios from "axios"
import ModalPay from "helpers/modalPay"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Button, CardHeader, Table } from "reactstrap"


export const TableInvoice =({state,data})=>{
  

  const [values,setValues] = useState(data)
  const token = localStorage.getItem('token') || '';
  const path = window.location.pathname;
  console.log(path)
  console.log(path ===  '/admin/factura')

  const downInvoice = async (id) =>{  


    axios({
      url: `http://localhost:8000/facturas/${id}/descargar/`,
      method: "GET",
      responseType: "blob", // importante
      onDownloadProgress: (progressEvent) => {
         var percentCompleted = Math.round((progressEvent.loaded * 100) /  progressEvent.total);
         console.log(percentCompleted)
      },
      headers: {
        'Content-type': 'application/json',
        //'token': token
        'Authorization': `Bearer ${ token }`
    },
    }).then((response) => {
       const url = window.URL.createObjectURL(new  Blob([response.data]));
       const link = document.createElement("a");
       link.href = url;
       link.setAttribute("download", "Factura.pdf");
       document.body.appendChild(link);
       link.click();
    });
  }
     if(state&&!!data){
        return(
          <div className="card m-2 bg-default shadow card ">
            <CardHeader className="bg-transparent">
              Facturas
            </CardHeader>
            <Table className="table table-dark table-striped align-items-center table-responsive ">
              <thead className="thead-dark">
                <tr>
                  <th scope="col"># Contrato</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Factura</th>
                  <th scope="col">Valor Pendiente</th>
                  <th scope="col">Valor Total</th>
                  <th scope="col">Estado Factura</th>
                  <th scope="col">Descagar Factura</th>
                  {path ===  '/admin/factura' ? 
                    <th scope="col">Pagar Factura</th>
                    :<></>}
                </tr>
              </thead>
              <tbody> 
                    {
                        data.map((factura,index) =>{
                        return(
                          <tr>
                            <td>{factura.contrato.id}</td>
                            <td>{factura.contrato.cliente.full_name}</td>
                            <td>{factura.id}</td>
                            <td>{factura.valor_pendiente_pago}</td>
                            <td>{factura.total_a_pagar}</td>
                            <td>{factura.estado.label}</td>
                            <td><Button className="btn btn-success btn-sm" onClick={() => downInvoice(factura.id)}>DESCARGAR PFD</Button></td>
                            {path ===  '/admin/factura' ? 
                              <td ><ModalPay ></ModalPay></td>
                              :<></>}
                          </tr>
                        )})
                    }           
              </tbody>
            </Table>
          </div>
        )
    }
    return (
        <></>
    )
} 