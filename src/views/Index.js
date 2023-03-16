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

import { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";




// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";
import { fetchWithToken } from "api/fetch";



import Header from "components/Headers/Header.js";
import { Recaudo } from "helpers/Estadistico";
import { newUsers } from "helpers/Estadistico";
import { fechaInicioMes } from "helpers/Estadistico";
import { fechaActual } from "helpers/Estadistico";
import { formatDate } from "helpers/Estadistico";
import { fechaInicioAnio } from "helpers/Estadistico";
import { valuePaidMonth } from "helpers/Estadistico";
import { expeditionDate } from "helpers/Estadistico";
import { FullValueYear } from "helpers/Estadistico";
import { chartData } from "helpers/Estadistico";
import { newContract } from "helpers/Estadistico";
import Reportes from "./examples/UserTables";
import { profitMonth } from "helpers/Estadistico";


const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  
  const date = new Date() 
  const expedition_date = formatDate(new Date(date.getFullYear(),date.getMonth(),1))
  const [data,setData] = useState()
  const [dataNow,setDataNow] = useState([0,0,0])

  const [dates,setDates] = useState({
    profit: '',
    remaining: '',
    newUsers: 0,
    newServices: 0,    
  });

  useEffect(() => {
      async function loadedCategories(){
        const response = await fetchWithToken('users/');
        let body = await response.json(); 
        
        //Obtener datos de contrato
        // const getService = await fetchWithToken( `reportes/clientes/informacion_financiera/?created__gte=${fechaInicioAnio(new Date())}&created__lte=${fechaActual()}`);
        // let bodyService = await getService.json();        
              
        const getService = await fetchWithToken( `contratos/`);
        let bodyService = await getService.json();
        
        
        //obtener datos de montos totales pagados en el mes actual

        const resFactura = await fetchWithToken( `facturas/?fecha_expedicion=${expedition_date}`);        
        let bodyFactura = await resFactura.json();
        let statistics = valuePaidMonth(bodyFactura)

        //Datos para informe de todo el año

        const resFacturaYear = await fetchWithToken( `facturas/`);
        let bodyFacturaYear = await resFacturaYear.json();
        setData(FullValueYear(date.getFullYear()-1,18, bodyFacturaYear))
        //setDataNow(FullValueYear(date.getFullYear(),1, bodyFacturaYear))
        setDataNow(profitMonth(date.getFullYear(),1, bodyFacturaYear))

        setDates({...dates,
          profit: statistics.prof,
          remaining: statistics.rem,
          newUsers: newUsers(body),
          newServices: newContract(bodyService,formatDate(new Date(date.getFullYear(),date.getMonth(),date.getDay()-60))),           
        })
      }       
      loadedCategories()      
  },[])  
  

  
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };   

  chartExample2.data.datasets[0].data=[dataNow[1],dataNow[2]]
  //console.log(chartExample2.data.labels)
  chartExample2.data.labels=['Enero', 'Febrero']

  //console.log(chartExample1[chartExample1Data])

  
  return (
    <>
      <Header datos={dates}/>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Descripción General
                    </h6>
                    <h2 className="text-white mb-0">Recaudo Mensual</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <h1>2022</h1>
                        {/* <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink> */}
                      </NavItem>
                      {/* <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem> */}
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart  ESTADISTICAS*/}

                <div className="chart">
                  <Line
                    // data={chartExample1[chartExample1Data]}
                    data={chartData(data)}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h1 className="text-uppercase text-muted ls-1 mb-1">
                      2023
                    </h1>
                    <h2 className="mb-0">Recaudo Mensual</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                    
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Page visits</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Page name</th>
                    <th scope="col">Visitors</th>
                    <th scope="col">Unique users</th>
                    <th scope="col">Bounce rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">/argon/</th>
                    <td>4,569</td>
                    <td>340</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/index.html</th>
                    <td>3,985</td>
                    <td>319</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/charts.html</th>
                    <td>3,513</td>
                    <td>294</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      36,49%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/tables.html</th>
                    <td>2,050</td>
                    <td>147</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/profile.html</th>
                    <td>1,795</td>
                    <td>190</td>
                    <td>
                      <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Social traffic</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Referral</th>
                    <th scope="col">Visitors</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>1,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="67"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>5,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google</th>
                    <td>4,807</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Instagram</th>
                    <td>3,678</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">twitter</th>
                    <td>2,645</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row> */}
        <Reportes />
      </Container>
    </>
  );
};

export default Index;
