import { Col } from "reactstrap";
import Slider from "./Slider";
const Home = () => {
  return (
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
  );
};

export default Home;
