import { Container,Row,Col } from "reactstrap"
import { Link } from "react-router-dom";

export const HomeAdmin = () => {


    return(
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8" >
            <Container>

            <h1 className="display-2">Accesos rápidos</h1>

                <div className="mb-4 row">

                    <div class="col-md-6 col-lg-3">
                        <button 
                            class="btn-icon-clipboard"
                            type="button">

                            <Link
                                className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                                to="/admin/user-profile"
                            >
                                <div>
                                    <i class="ni ni-single-02 text-yellow"></i>
                                    <span>Perfil de Usuario</span>
                                </div>
                            </Link>
                        </button>
                    </div>

                    <div class="col-md-6 col-lg-3">
                        <button 
                            class="btn-icon-clipboard"
                            type="button">

                            <Link
                                className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                                to="/admin/factura"
                            >
                                <div>
                                    <i class="fa fa-search"></i>
                                    <span>Consultar Factura</span>
                                </div>
                            </Link>
                        </button>
                    </div>


                </div>

                {/* <div className="header-body text-center mb-3">
                    <Row className="justify-content-center">
                        <Col lg="5" md="6">
                        <h1 className="display-2">Bienvenido al Panel de Control</h1>
                        <img src="https://cdn.pixabay.com/photo/2017/06/13/10/22/board-2398309_960_720.jpg" className="img-fluid homeAdmin "></img>
                        
                        </Col>
                    </Row>
                </div> */}
                
            </Container>
        </div>
    )
}