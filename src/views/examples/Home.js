import { Col,Row,Container } from "reactstrap";
import Slider from "./Slider";
const Home = () => {
  return (
    
    
      <Container>
              <div className="header-body text-center mb-3">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    <h1 className="display-2">Bienvenido a NRG-X</h1>                    
                  </Col>
                  <Col lg="15" m="8">
                  <Slider />
                  <div className="header-body text-center mb-4">
                    <h3 className="text-white">
                      Contrata tu servicio de energia con nosotros
                    </h3>        
                    <p className="text-white">
                      Llama al: +57 300 452 458 o nacional 018000 256 68 58
                    </p>
                  </div>
                  </Col>
                </Row>
              </div>
            </Container>
      
  );
};

export default Home;
