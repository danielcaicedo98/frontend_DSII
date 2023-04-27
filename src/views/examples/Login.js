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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startLogin } from "actions/auth";

import { loading } from "notifications/notification";

import { resolveModuleName } from "typescript";
import Loader from "notifications/Loader";
import ReCAPTCHA from "react-google-recaptcha";


const Login = () => {

  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const [state, setState] = useState(null)

  const dispatch = useDispatch();


  const loginChange = (e) => {
    setValues({
      ...values, [e.target.name]: e.target.value
    })
  }

  const loginSubmit = async (e) => {
    e.preventDefault();


    // dispatch(startLogin( values.email , values.password ) )
    let response = dispatch(startLogin(values.email, values.password))
    setState(!!response)

  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            {state === null ? <></> : <Loader />
            }










            {/*
                <div className="text-muted text-center mt-2 mb-3">
              <small>Ingresa con</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>

  */}

          </CardHeader>

          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Ingresa con tus credenciales</small>
            </div>
            <Form onSubmit={(e) => loginSubmit(e)}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="email"
                    id="mail"
                    className="form-control"
                    name="email"
                    value={values.email}
                    onChange={(e) => loginChange(e)}
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
                    type="password"
                    id="password"
                    className="form-control"
                    name="password"
                    value={values.password}
                    onChange={(e) => loginChange(e)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <ReCAPTCHA
                  sitekey="6LcMj7olAAAAAEwNIJ42svPhdlJhVlfKAuvoV6yd"
                  onChange={(value) => {
                    setState(value);
                  }}
                />
              </FormGroup>

              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"

                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Recuérdame</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit" >
                  Iniciar Sesión
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>¿Olvidaste tu contraseña?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Crea una cuenta</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
