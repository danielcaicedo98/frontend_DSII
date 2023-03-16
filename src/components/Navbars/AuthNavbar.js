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
import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

const AdminNavbar = () => {
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand='md'>
           
        <Container className="px-4">
        <NavbarBrand className="mh-120 mw-120 fluid" to="auth/home" tag={Link}>
            <img className="h-25 rounded-circle" width='80'
              alt="..."
              src={require("../../assets/img/brand/logo_nrgx.png")}
            />
        </NavbarBrand> 
                
          
         
          
          
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="7">
                  <Link to="/">
                    <img
                      alt="..."
                      src={require("../../assets/img/brand/NRGX-icon.png")}
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/auth/home"
                  tag={Link}
                >
                  <i className="fa fa-home" />
                  <span className="nav-link-inner--text">Inicio</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link-icon" to="/auth/login" tag={Link}>
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">Inicia sesión</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link-icon" to="/auth/factura" tag={Link}>
                  <i className="fa fa-search" /> 
                  <span className="nav-link-inner--text">Consultar Factura</span>
                </NavLink>
              </NavItem>              
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
