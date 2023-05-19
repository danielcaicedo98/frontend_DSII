import axios from "axios";
import { warningUser } from "notifications/notification";
import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const ModalPay = () => {

    const token = localStorage.getItem('token') || '';
    const [values,setValues] = useState({
        factura: '',
        total_pago: '',
        forma_pago: '1'
    })


    const formData = new FormData(); 
    formData.append('factura', values.factura);
    formData.append('total_pago', values.total_pago);
    formData.append('forma_pago', values.forma_pago);

    const enviarPago = async () => {
        try {
          const response = await axios({
            url: 'http://localhost:8000/facturas-pagos/',
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${ token }`
            },
            data: formData
          });
          warningUser('Exito','Pago realizado','success')
        //   setTimeout(function(){
        //     window.location.reload(7);
        //   }, 1000);  
        } catch (error) {
          console.error('La petición falló:', error);
          
          warningUser('Error',Object.values(error.response.data).map(cadena => cadena.toString()),'error')
          console.log('Detalles del error:', Object.values(error.response.data).map(cadena => cadena.toString()));
          
        }
      }

    const registrar_pago = () => {
        enviarPago();
    }

    const onFormChange = (e) => {    
        setValues({...values, [e.target.name] : e.target.value      
        })
        
    } 



    return(
        <div>
            <Button type="button" className="btn  btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
                REGISTRAR PAGO
            </Button>
            <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"><h2>Registrar Pago</h2></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">                
                <Form>      
                    <FormGroup>
                        <Label for="" className="text-dark">ID Factura</Label>
                        <Input 
                            type="text" 
                            name="factura" 
                            id="" 
                            placeholder="with a placeholder"
                            onChange = {(e) => onFormChange(e)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="" className="text-dark"> Total a Pagar</Label>
                        <Input 
                            type="text" 
                            name="total_pago" 
                            id="examplePassword" 
                            placeholder="password placeholder"
                            onChange = {(e) => onFormChange(e)} />
                    </FormGroup>
                        {/* <FormGroup>
                        <Label for="" className="text-dark">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                        </FormGroup>
                        */}
                    <FormGroup> 
                        <Button className="btn btn-warning" onClick={() => registrar_pago()}> Registrar</Button>  
                    </FormGroup>     
                </Form>            
                </div>      
                </div>
            </div>
            </div>
        </div>

    )

}
export default ModalPay;



