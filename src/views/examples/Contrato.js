/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import "assets/css/styles.css"
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col
} from "reactstrap";

import { useState} from 'react';
import { fetchWithToken } from "api/fetch"; 
import { warningUser } from "notifications/notification";

const Register = () => {
  

  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
    const [values , setValues] = useState({
      cliente: 0,
      servicios: '',
      tipoDeServicio: '',
      estrato:'',
      fecha_instalacion:'' ,
      direccion_instalacion:'',
      ciudad:''
    })

    const onFormChange = (e) => {
    
        setValues({...values, [e.target.name] : e.target.type === 'number' ? parseInt(e.target.value) : e.target.value      
        })
        
      }
    
      const Register = async () => {
        
          const response = await fetchWithToken( 
                                  'contratos/', 
                                  { 
                                    cliente:values.cliente,
                                    servicios:[1],
                                    tipoDeServicio:values.tipoDeServicio,
                                    direccion_instalacion:values.direccion_instalacion,
                                    estrato:values.estrato,
                                    fecha_instalacion:values.fecha_instalacion,
                                    ciudad:values.ciudad
                                  }, 
                                  'POST' 
                              );
                                  

            if(response.ok){
              warningUser("Registro Exitoso","","success")              
              setTimeout(function(){
                window.location.reload(7);
              }, 100);
            }else if (!response.ok){
              warningUser("Registro Fallido",response.statusText,"error")              
            }       
          
      //    console.log(values + "  " + values[0].first_name)
      
      }
    
      const onFormSubmit = async (e) =>{    
        console.log(values)
        e.preventDefault()
        Register()
    
      }
    
    
      return (
        <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        
          <div className="RegisterComponent">
            <Col lg="8" md="10">
              <Card className="bg-secondary shadow border-0">
                
                  <div className="text-muted text-center mt-2 mb-0">
                    <b>Registrar Contrato</b>
                  </div>
                
                <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form" onSubmit={(e) => onFormSubmit(e)}>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-badge" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Cliente" name="cliente" type="number" onChange = {(e) => onFormChange(e)}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="ni ni-button-power"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" name="servicio" id="servicio" placeholder="servicio" onChange = {(e) => onFormChange(e)}> 
                            <option selected disabled={true} value="">Servicio</option>
                            <option value="[1]" >Energía</option>
                            <option value="[2]">Otro</option>
                        </Input>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="ni ni-briefcase-24"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" name="tipoDeServicio" id="tipoDeServicio" placeholder="tipo de servicio" onChange = {(e) => onFormChange(e)}> 
                            <option selected disabled={true} value="">Tipo De Servicio</option>
                            <option >Empresarial</option>
                            <option value="Residencial">Residencial</option>
                        </Input>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-building" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Dirección" name="direccion_instalacion" type="text" onChange = {(e) => onFormChange(e)}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="ni ni-compass-04"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" name="ciudad" id="ciudad" placeholder="ciudad" onChange = {(e) => onFormChange(e)}> 
                            <option selected disabled={true} value="">Ciudad</option>
                            <option value={1} >Cali</option>
                            <option value={2}>Medellin</option>
                            <option value={3}>Bogotá</option>
                            <option value={4}>Barranquilla</option>
                        </Input>
                      </InputGroup>
                    </FormGroup>
                  <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="ni ni-circle-08"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" name="estrato" id="estrato" placeholder="estrato" onChange = {(e) => onFormChange(e)}> 
                            <option selected disabled={true} value="">Estrato</option>
                            <option >1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                        </Input>
                      </InputGroup>
                    </FormGroup>
                  <div className="text-muted font-italic">
                      <small>
                        Fecha De Instalación 
                      </small>
                    </div>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="fa-solid fa-calendar-days"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Fecha De Instalacion"
                          type="date"
                          onfocus="(this.type='date')"
                          name="fecha_instalacion"
                          onChange = {(e) => onFormChange(e)}
                        />
                      </InputGroup>
                    </FormGroup>        
                    <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit"  >
                    REGISTAR CONTRATO
                  </Button>
                </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </div>
        </div>
        
        </>
      )        
}

export default Register

