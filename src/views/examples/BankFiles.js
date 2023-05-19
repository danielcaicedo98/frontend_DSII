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
  InputGroup,
  Col
} from "reactstrap";

import { useState} from 'react';
import { fetchWithToken } from "api/fetch"; 
import axios from "axios";


const BankFiles = () => {

  const token = localStorage.getItem('token') || '';
  const [file , setFile] = useState({
    archivo: null,
  })

  const formData = new FormData();  
  formData.append('archivo', file); 

  const [error, setError] = useState(null);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  
  const handleFileChange = (e) => {
   const selectedFile=e.target.files[0];
   console.log(selectedFile.type === 'text/csv');
    if (selectedFile.type === 'text/csv') { 
        setFile(selectedFile);
        setError(null);
        setIsButtonDisabled(false);
      } else {
        setFile(null);
        setError('Por favor selecciona un archivo CSV, solo este es válido');
        setIsButtonDisabled(true);
      }
  };

/*   const onFormChange = (e) => {
    
    setValues({...values, [e.target.name] : e.target.type === 'number' ? parseInt(e.target.value) : e.target.value      
    })
    console.log(values)
  } */



  const subirArchivo = async () => {
    try {
      const response = await axios({
        url: 'http://localhost:8000/facturas-pagos/bancos/',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ token }`
        },
        data: formData
      });
      warningUser('Exito','Archivo Subido Con Exito','success')
      setTimeout(function(){
        window.location.reload(7);
      }, 2000);  
    } catch (error) {
      console.error('La petición falló:', error);
      
      warningUser('Error',Object.values(error.response.data).map(cadena => cadena.toString()),'error')
      console.log('Detalles del error:', Object.values(error.response.data).map(cadena => cadena.toString()));
      
    }
  }

 const onFormSubmit = async (e) =>{    
    e.preventDefault()
    subirArchivo()  
  }



  return (
    <>
    <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
    <div className="RegisterComponent">
      <Col lg="8" md="10">
        <Card className="bg-secondary shadow border-0">

            <div className="text-muted text-center mt-2 mb-0">
              <b>Sube el archivo de pagos:</b>
            </div>
            
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={(e) => onFormSubmit(e)}>
            <div className="input-archivo-banco"> 
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                  </InputGroupAddon>
                  <Input className="custom-file-upload" placeholder="Archivo" name="archivo" type="file" onChange = {(e) => handleFileChange(e)}/>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                </InputGroup>
              </FormGroup>
            </div>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit" disabled={isButtonDisabled} >
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

export default BankFiles;