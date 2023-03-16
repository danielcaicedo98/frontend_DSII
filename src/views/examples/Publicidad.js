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


const Publicidad = () => {

  const [archivos,setArchivos] = useState(null)
  const [values , setValues] = useState({
    nombre_publicidad:'',
    fecha_vigencia_inicio:'',
    fecha_vigencia_fin:'',
    path_template: '',
    // seccion_factura: '',
  })

  const onFormChange = (e) => {
    
    setValues({...values, [e.target.name] : e.target.type === 'number' ? parseInt(e.target.value) : e.target.value      
    })
    console.log(values)
  }

  const crearPublicidad = async () => {
    
      const response = await fetchWithToken( 
                              'publicidad/', 
                              { 
                                nombre_publicidad:values.nombre_publicidad,
                                fecha_vigencia_inicio:values.fecha_vigencia_inicio,
                                fecha_vigencia_fin:values.fecha_vigencia_fin,
                                path_template:values.path_template,
                                // seccion_factura:values.seccion_factura
                              }, 
                              'POST' 
                          );

      
  //    console.log(values + "  " + values[0].first_name)
  
  }

  const onFormSubmit = async (e) =>{    
    console.log(values)
    e.preventDefault()
    crearPublicidad()

  }

  const subirArchivos = (e) =>{
    setArchivos(e)
  }


  return (
    <>
    <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
    <div className="RegisterComponent">
      <Col lg="8" md="10">
        <Card className="bg-secondary shadow border-0">
          
            <div className="text-muted text-center mt-2 mb-0">
              <b>Publicidad</b>
            </div>
          
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={(e) => onFormSubmit(e)}>
            <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Nombre publicidad" name="nombre_publicidad" type="text" onChange = {(e) => onFormChange(e)}/>
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  Fecha de inicio: 
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
                    placeholder="Fecha de vigencia inicio"
                    type="date"
                    onfocus="(this.type='date')"
                    name="fecha_vigencia_inicio"
                    onChange = {(e) => onFormChange(e)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  Fecha de fin: 
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
                    placeholder="Fecha de vigencia fin"
                    type="date"
                    onfocus="(this.type='date')"
                    name="fecha_vigencia_fin"
                    onChange = {(e) => onFormChange(e)}
                  />
                </InputGroup>
              </FormGroup>
              {/* <div className="text-center">
                <Button className="mt-4" color="primary" type="submit"  >
                  Subir archivo
                </Button>
              </div> */}
              <Input type="file" multiple onChange={() => subirArchivos()}></Input>
               <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <i className="ni ni-badge"></i>
                    
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="select" name="seccion_factura" id="seccionFactura" placeholder="Lugar de la publicidad en la factura" onChange = {(e) => onFormChange(e)}> 
                      <option selected disabled={true} value="">Lugar de la publicidad</option>
                      <option value="[2]">Superior</option>
                      <option value="[3]">Inferior</option>
                  </Input>
                </InputGroup>
              </FormGroup> 
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit"  >
                  Enviar
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

export default Publicidad;
