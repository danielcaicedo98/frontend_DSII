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

import { warningUser } from "notifications/notification";
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


const Register = () => {

  const [values , setValues] = useState({
    email: '',
    password: '',
    is_Active: true,
    phone_number:'',
    first_name:'',
    last_name:'',
    identification_type: 1 ,
    identification_number: '',
    groups: [],
    birth_date:'',
    is_Client: false
  })

  const onFormChange = (e) => {
    
    setValues({...values, [e.target.name] : e.target.type === 'number' ? parseInt(e.target.value) : e.target.value      
    })
    console.log(values)
  }

  const crearUsuario = async () => {
    
      const response = await fetchWithToken( 
                              'users/', 
                              { 
                                first_name:values.first_name,
                                last_name: values.last_name,
                                is_Active:values.is_Active,
                                email:values.email,
                                identification_number:values.identification_number,
                                identification_type:1,
                                birth_date:values.birth_date,
                                is_Client:values.is_Client,
                                password:values.contraseña,
                                phone_number:values.phone_number,
                                groups: [1]
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
    crearUsuario()

  }


  return (
    <>
    <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
    <div className="RegisterComponent">
      <Col lg="8" md="10">
        <Card className="bg-secondary shadow border-0">
          
            <div className="text-muted text-center mt-2 mb-0">
              <b>Registra un usuario:</b>
              
            </div>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={(e) => onFormSubmit(e)}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Nombres" name="first_name" type="text" onChange = {(e) => onFormChange(e)}/>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Apellidos" name="last_name" type="text" onChange = {(e) => onFormChange(e)} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    name="email"
                    onChange = {(e) => onFormChange(e)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Contraseña"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    onChange = {(e) => onFormChange(e)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-mobile-button" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Número de celular"
                    name="phone_number"
                    onChange = {(e) => onFormChange(e)}
                    type="number"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <i className="ni ni-badge"></i>
                    
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="select" name="identification_type" id="TipoDocumento" placeholder="Tipo de documento" onChange = {(e) => onFormChange(e)}> 
                      <option selected disabled={true} value="">Tipo de documento</option>
                      <option >Cédula</option>
                      <option value="[2]">Tarjeta de identidad</option>
                      <option value="[3]">Cédula de extranjería</option>
                  </Input>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <i className="ni ni-badge"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Numero de Identificación"
                    type="number"
                    name="identification_number"
                    onChange = {(e) => onFormChange(e)}
                  />
                </InputGroup>
              </FormGroup>
             {localStorage.getItem('rol') == 3 ?
             <FormGroup>
             <InputGroup className="input-group-alternative">
               <InputGroupAddon addonType="prepend">
                 <InputGroupText>
                 <i className="ni ni-single-02"></i>
                 
                 </InputGroupText>
               </InputGroupAddon>
               <Input type="select" name="groups"  placeholder="Rol" onChange = {(e) => onFormChange(e)} > 
                   <option selected disabled={true}>Rol</option>
                   <option  value="[2]">Cliente</option>
               </Input>
             </InputGroup>
           </FormGroup>:
           <FormGroup>
           <InputGroup className="input-group-alternative">
             <InputGroupAddon addonType="prepend">
               <InputGroupText>
               <i className="ni ni-single-02"></i>
               
               </InputGroupText>
             </InputGroupAddon>
             <Input type="select" name="groups"  placeholder="Rol" onChange = {(e) => onFormChange(e)} > 
                 <option selected disabled={true}>Rol</option>
                 <option value="[1]">Administrador</option>
                 <option value="[2]">Cliente</option>
                 <option value="[3]">Operador</option>
                 <option value="[4]">Gerente</option>
             </Input>
           </InputGroup>
         </FormGroup>
           } 
              <div className="text-muted font-italic">
                <small>
                  Fecha de nacimiento: 
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
                    placeholder="Fecha de nacimiento"
                    type="date"
                    onfocus="(this.type='date')"
                    name="birth_date"
                    onChange = {(e) => onFormChange(e)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  Seguridad de la contraseña:{" "}
                  <span className="text-success font-weight-700">Alta</span>
                </small>
              </div>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit"  >
                  Crear cuenta
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </div>
    </div>
    </>
  );
};

export default Register;
