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
import { fetchWithTokenFile } from "api/fetch";
import axios from "axios";
import { warningUser } from "notifications/notification";


const Publicidad = () => {
  const [image, setImage] = useState(null);
  const [values , setValues] = useState({
    nombre_publicidad:'',
    fecha_vigencia_inicio:'',
    fecha_vigencia_fin:'',     
  })
  
  const handleImageChange = event => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
    console.log(image)
  };

  const onFormChange = (e) => {    
    setValues({...values, [e.target.name] : e.target.type === 'number' ? parseInt(e.target.value) : e.target.value      
    })
    console.log(values)
  }

  const formData = new FormData();  
  formData.append('nombre', values.nombre_publicidad); // reemplaza 'example image' por el nombre real de la imagen
  formData.append('fecha_vigencia_inicio', values.fecha_vigencia_inicio);
  formData.append('fecha_vigencia_fin', values.fecha_vigencia_fin); 
  formData.append('imagen', image); 
  const token = localStorage.getItem('token') || '';

  const crearPublicidad = async () => {
    try {
      const response = await axios({
        url: 'http://localhost:8000/publicidad/',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ token }`
        },
        data: formData
      });
      warningUser('Creada','Publicidad Creada con Exito','success')
      setTimeout(function(){
        window.location.reload(7);
      }, 1000);  
    } catch (error) {
      console.error('La petición falló:', error);
      
      warningUser('Creada',Object.values(error.response.data).map(cadena => cadena.toString()),'error')
      console.log('Detalles del error:', Object.values(error.response.data).map(cadena => cadena.toString()));
      
    }
  }

 const onFormSubmit = async (e) =>{    
    e.preventDefault()
    crearPublicidad()  
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
               <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <i className="ni ni-badge"></i>                    
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="select" name="seccion_factura" id="seccionFactura" placeholder="Lugar de la publicidad en la factura" onChange = {(e) => onFormChange(e)}> 
                      <option selected disabled={true} value="">Lugar de la publicidad</option>
                      <option value="A">Superior</option>
                      <option value="B">Inferior</option>
                      <option value="C">Derecha</option>
                      <option value="D">Atrás</option>
                  </Input>
                </InputGroup>
              </FormGroup> 
              <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
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
