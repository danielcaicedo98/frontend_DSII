import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row } from "reactstrap"
import "assets/css/styles.css"
import { TableInvoice } from "./TableInvoice"
import { useEffect, useState } from "react"
import { fetchWithToken } from "api/fetch"
import { formatDate } from "helpers/Estadistico"
import { warningUser } from "notifications/notification"

export const Facturacion = () => {
    const [data,setData] = useState()
    const[state,setState] = useState(false)
    const [dataService,setDataService] = useState({
        nombre: "",
        descripcion: "",
        unidad_medida: {
            value: "1",
            label: "KILOVATIOS / HORA"
        },
        valor_unitario: 0,        
    })

    const [dateCut,setDateCut] = useState()
    const [dia_corte,setDia] = useState()

    let date = new Date()
    date = formatDate(new Date(date.getFullYear(),date.getMonth(),1))
    
    useEffect(() =>{
        async function load(){
            const resFact = await fetchWithToken(`configuraciones_facturacion/`);
            let bodyFact = await resFact.json();

            setDia(bodyFact[0].dia_de_corte)
            localStorage.setItem('dia_corte',bodyFact[0].dia_de_corte)
            const response = await fetchWithToken(`facturas/?fecha_expedicion=${date}`);
            const body = await response.json(); 
            setData(body)
            setState(true)
             
            const responseService = await fetchWithToken(`/servicios/1/`);
            let bodyResponse = await responseService.json(); 
            setDataService(bodyResponse)
                                                    
             

            
             
        }
        load()
    },[])

    console.log(dia_corte)


    const request  = async (e) =>{    
                                    
                const response = await fetchWithToken(`facturas/crear_facturas_contratos/`);
                const body = await response.json();    
                console.log(body.detail)             
                if(response.ok){
                    warningUser("Cosulta exitosa","","success")
                }else{
                    warningUser("Error",body.detail,"error")
                }
            
    }     
    

    const onFormChange = (e) => {

        setDia(e.target.value)
        
    }
    let dia = new Date(new Date().getFullYear)
    dia = dia

    console.log()

    const onClickGenerate = () =>{   
        if(new Date().getDay()-1 === dia_corte){
            request()
        }  else{
            warningUser("Error","El día de corte es " +dia_corte+" de cada mes","error" )
        }   
         
    }

    const onClickChange  = async () =>{        

        if(dia_corte > 0 && dia_corte < 31)
        {const response = await fetchWithToken(         
            `configuraciones_facturacion/1/`, 
                {                    
                    dia_de_corte: dia_corte,  
                    porcentaje_recargo_mora: 2.0
                    
                }, 
                'PATCH' 
        );
        console.log(response)

        if(response.ok){
            warningUser("Exito","Día de Corte Actualizado","success")
        }
       }else{
        warningUser("Error","Día de corte no válido","error")
       }
    }

    return(
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8 invoice">
            <Col lg="10" md="10">
                <Card className="text-aling-center">
                    <CardHeader >
                        <h3>Facturacion de Servicio</h3>
                    </CardHeader>
                    <CardBody>
                        <Form>
                        <FormGroup className="row">          
                           
                            <Col >
                                <Label><h3>Descripcion</h3> </Label>                  
                                <InputGroup >
                                                         
                                <Input name="first_name" type="text" readOnly value={dataService.descripcion}/>
                                </InputGroup> 
                            </Col>
                            <Col >
                                <Label><h3>Unidad de Medida</h3> </Label>                  
                                <InputGroup >
                                                           
                                <Input name="first_name" type="text" readOnly value={dataService.unidad_medida.label}/>
                                </InputGroup> 
                            </Col>
                                                    
                        </FormGroup>

                        <FormGroup className="row">  
                        <Col>
                            <Label><h3>Valor de Medida</h3> </Label>                  
                            <InputGroup >                         
                                                        
                            <Input name="first_name" type="number" readOnly value={dataService.valor_unitario}/>
                            </InputGroup> 
                        </Col>
                        <Col>                        
                            <Label><h3>Fecha de Corte</h3> </Label>                                                  
                            <Row>
                            <InputGroup className="col">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="ni ni-scissors" />
                                </InputGroupText>
                            </InputGroupAddon>                            
                            <Input name="fecha_corte" type="number" onChange = {(e) => onFormChange(e)} value={dia_corte}/>
                            
                            </InputGroup>    
                            <Button className="btn btn-primary bg-primary text-white " onClick={onClickChange}>Cambiar</Button>
                            </Row>
                        </Col>                        
                        </FormGroup>
                        <Col>
                        <Card className="">
                            <CardBody>
                                <Label><h3>Crear Facturas Mes Actual</h3> </Label>                                                  
                                <Row className="invoice">                            
                                <Button className="btn btn-primary bg-primary text-white" onClick={onClickGenerate}>Crear</Button>
                                </Row>
                                <TableInvoice state = {state} data={data} className="table-fact" />
                            </CardBody>
                        </Card>
                        </Col>                                                   
                        </Form>
                        
                    </CardBody>
                   
                </Card>
            </Col>

            
        </div>
    )
}