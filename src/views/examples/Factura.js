import { fetchWithToken } from "api/fetch";
import { useState } from "react";
import "assets/css/styles.css"
import {
    Form,
    Input,
    Button,
    Col,
    Container,
    Label,
    CardBody,
    Card,
  } from "reactstrap";
import { TableInvoice } from "./TableInvoice";
import { warningUser } from "notifications/notification";
import { fetchWithoutToken } from "api/fetch";

const Factura = () =>{
    const [data,setData] = useState()
    const [values,setValues] = useState({
       ClientID: '',
       ContractID: ''
    })

    const[state,setState] = useState(false)
    const request  = async (e) =>{
        
        if(!!values.ContractID){
            try{
                const dateLastYear = '2022-01-01'
                const dateYear = '2023-01-27'                
                const response = await fetchWithoutToken(`reportes/clientes/informacion_financiera/?contratos=${values.ContractID}`);
                const body = await response.json(); 
                setData(body)            
                setState(true)
                if(response.ok){
                    warningUser("Cosulta exitosa","","success")
                }
            }catch{
                warningUser("Error Consulta","Datos no Encontrados","error")
            }
        }else{
            warningUser("Error Consulta","Por favor no deje campos vacíos","error")
        }  
              
    }       
            
    
          
    const onFormChange = (e) => {
    
        setValues({...values, [e.target.name] : e.target.type === 'number' ? parseInt(e.target.value) : e.target.value      
        })
        
      }

    const onFormSubmit=(e)=>{
         // No recarga la page.

         e.preventDefault()         
         const { ClientID, ContractID } = e.target           
         // Datos
         request(e) 
    }    
   
   
    return (
        <>
        <div className="header bg-gradient-default pb-8 pt-5 pt-md-8">
            <Col className="invoice">
                <Card className="bg-secondary shadow border-0">  
                    <CardBody className="bg-transparent pb-5 ">          

                    <Col>
                        <h1>Consulte su Factura</h1>
                    </Col>
                    <Form onSubmit={(e)=>onFormSubmit(e)}>
                        {/* <Col className="pb-3">                    
                            <Input className="form-control" type="number" name="ClientID"  placeholder="Ingrese su ID" onChange={(e) => onFormChange(e)}></Input>
                        </Col> */}
                        <Col className="pb-3">                    
                            <Input className="form-control" type="number" name="ContractID"  placeholder="Ingrese su ID del contrato"  onChange={(e) => onFormChange(e)} ></Input>
                        </Col>
                        
                        <Col className="pt-3">
                            <Button color="primary" className="flex w-100">Consultar</Button>
                        </Col>
                    </Form>
                    <TableInvoice state = {state} data={data}/>
                    

                    </CardBody>
                </Card>
            </Col> 
        </div>
        </>
    )
}

export default Factura 