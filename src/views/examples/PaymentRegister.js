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


const PaymentRegister = () => {

  const [values , setValues] = useState({
    cedula: '',
    codigoFactura:'',
    valorPagado:'',
    formaPago:'presencial'
  })

  const onFormChange = (e) => {
    
    setValues({...values, [e.target.name] : e.target.type === 'number' ? parseInt(e.target.value) : e.target.value      
    })
    console.log(values)
  }

  const pagar = async () => {
/*       const response = await fetchWithToken( 
                              '', 
                              { 

                              }, 
                              'POST' 
                          );  */
  }

  const onFormSubmit = async (e) =>{    
    console.log(values)
    e.preventDefault()
    pagar()

  } 


  return (
    <>
    <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
    <div className="RegisterComponent">
      <Col lg="8" md="10">
        <Card className="bg-secondary shadow border-0">
          
            <div className="text-muted text-center mt-2 mb-0">
              <b>Registra un pago:</b>
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
                  <Input placeholder="Cedula" name="cedula" type="number" onChange = {(e) => onFormChange(e)}/>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Codigo de Factura" name="codigoFactura" type="number" onChange = {(e) => onFormChange(e)} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-money-coins" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Valor"
                    type="number"
                    name="valorPagado"
                    onChange = {(e) => onFormChange(e)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit"  >
                  Registrar pago
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

export default PaymentRegister;