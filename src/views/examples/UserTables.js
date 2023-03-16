import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
  Input,
  Button
} from "reactstrap";

// core components

import { types } from "types/types";
import { useEffect, useState } from "react";
import _ from "lodash";
import { desactivarCliente } from "actions/settingUsers";
import { fetchWithToken } from "api/fetch";
import { routeReport } from "helpers/Estadistico";
import { warningUser } from "notifications/notification";
const pageSize = 5;

const Reportes = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inputContract, setInputContract] = useState("");
  const [paginatedPost, setPagination] = useState ([]);    
  const [current, setCurrent] = useState(1);
  const [value, setValue] = useState("");
  const [tableFilter, setTableFilter] = useState([]);  

  const [values , setValues] = useState({
    created__gte: '',
    created__lte: '',
    clientes: '',
    contratos:'',    
  })


  const pageCount = data ? Math.ceil(data.length/pageSize) :0      

  
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);    
  };
  const handleTextChange = (event) => {
    console.log(event);
  };
  const onHandleClick = async (e) => {
    
    e.preventDefault();
    desactivarCliente();
  };

 
  async function load() {
    try{
    const response = await fetchWithToken(routeReport(values));
    const body = await response.json();
    if(response.ok)
    {setData(body)
    setPagination(_(body).slice(0).take(pageSize).value()) 
    warningUser("Consula Exitosa","","success")
    return
    }
  }
    catch{warningUser("Consula Fallida","No se han encontrado datos relacionados","error")}
  }
    
  console.log(routeReport(values))
   

  const changeData = (user) =>{    
    let newData = data.map((e) => (e.id === user.id ? e=user : e));
    setData(newData)
    setPagination(_(newData).slice(0).take(pageSize).value())  
  } 

  const filterData = (e) => {
    if (e.target.value !== "") {
      setValue(e.target.value);
      const filterTable = data.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k])
            .toLocaleLowerCase()
            .includes(e.target.value.toLocaleLowerCase())
        )
      );
      setTableFilter([...filterTable]);
    } else if (e.target.value === "/") {
      setValue(e.target.value);
      const filterTable = data.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k])
            .toLocaleLowerCase()
            .includes(e.target.value.toLocaleLowerCase())
        )
      );
      setTableFilter([...filterTable]);
    } else {
      setValue(e.target.value);
      setData([...data]);
    }
  };
  const pages = _.range(1, pageCount + 1);
  const pagination = (pageNo) => {
    setCurrent(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const pagPost = _(data).slice(startIndex).take(pageSize).value();
    setPagination(pagPost);
  };


  const onFormChange = (e) => {
    
    setValues({...values, [e.target.name] : e.target.type === 'number' ? parseInt(e.target.value) : e.target.value      
    })
    console.log(values)
  }
  
  const clickFilter  = (e) =>{
    e.preventDefault()
    console.log('hola')
    load()
  }
  return (
    <>
      {/* Page content */}
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container className="mt--7" fluid>
          {/* Table */}

          {/* Dark table */}
          <Row className="mt-6">
            <div className="col">
              <Card className="bg-default shadow">
              <h1 className="text-white m-3">Reporte Finaciero</h1>
                <CardHeader className="bg-transparent border-0">
                  <div style={{ display: "flex" }}>
                    <Input
                      style={{ width: "25%" ,marginRight: '40px'}}
                      type="text"
                      className="form-control"
                      placeholder="Buscar Usuario"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      name="clientes"                      
                      onChange={(e)  => onFormChange(e)}
                    />
                    <small className="text-muted font-italic">
                      Fecha Inicial de busqueda:
                    </small>
                    <Input
                      style={{ width: "25%",marginRight: '20px' }}
                      type="date"
                      name="created__gte"
                      onChange={(e)  => onFormChange(e)}
                    />
                    <small className="text-muted font-italic">
                      Fecha Final de busqueda:
                    </small>
                    <Input
                      style={{ width: "25%" ,marginRight: '40px'}}
                      type="date"
                      name="created__lte"
                      onChange={(e)  => onFormChange(e)}
                      
                    />
                    <Input
                      style={{ width: "25%",marginRight: '20px'}}
                      type="text"                      
                      name="contratos"
                      onChange={(e)  => onFormChange(e)}                      
                      placeholder="Id Contrato"
                    />
                    <Button
                      className="btn btn-sm bg-success text-white"
                      type="text"                      
                      onClick={(e) => clickFilter(e)}                      
                      placeholder="Tipo de Contrato"
                    >Filtrar</Button>
                  </div>
                </CardHeader>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    
                    <tr>
                      {
                        //<th scope="col">ID</th>
                      }
                      <th scope="col">ID</th>
                      <th scope="col">Nombre</th> 
                      <th scope="col">Tipo contrato</th>
                      <th scope="col">Pago Factura</th>
                      <th scope="col">Estado Factura</th>
                      <th scope="col">Estado de Cliente</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      paginatedPost.map((report,index) =>{
                        return(
                          <tr>
                            {
                              //<th scope="col">{<button> </button>}</th>
                            }
                            <th scope="col">{report.contrato.id}</th>
                            <th scope="col">{report.contrato.cliente.full_name}</th>                            
                            <th scope="col">{report.contrato.tipo_de_uso.label}</th>
                            <th scope="col">{report.total_a_pagar}</th>
                            <th scope="col">{report.contrato.estado_de_pago.label}</th>
                            <th scope="col">{report.contrato.estado.label}</th>
                          </tr>
                        )
                      })
                    }
                    {/* {value.length > 0
                      ? tableFilter.map((appo, index) => {
                        console.log(appo)
                          return (
                            <tr key={appo.id}>
                              <td>{appo.id}</td>
                              <td>{appo.first_name}</td>
                              <td>{appo.last_name}</td>
                              <button className="bg-red">
                                {appo.is_active ? "Al dia" : "En mora"}
                              </button>
                              <button className="bg-red">
                                {appo.is_active ? "Activo" : "Desactivado"}
                              </button>
                            </tr>
                          );
                        })
                      : paginatedPost.map((appo) => (
                          <tr key={appo.id}>
                            <td>{appo.id}</td>
                            <td>{appo.first_name}</td>
                            <td>{appo.last_name}</td>
                            <td>
                              {appo.is_active ? (
                                <button className="bg-green"> Al dia</button>
                              ) : (
                                <button className="bg-red"> En mora</button>
                              )}
                            </td>
                            <td>
                              {appo.is_active ? (
                                <button className="bg-green"> Activo</button>
                              ) : (
                                <button className="bg-red"> Inactivo</button>
                              )}
                            </td>
                          </tr>
                        ))} */}
                  </tbody>
                </Table>
                <CardFooter className="py-4 bg-default shadow">
                  <nav className="d-felx justify-content-center">
                    <ul className="pagination">
                      {pages.map((page) => (
                        <li
                          className={
                            page === current ? "page-item active" : "page-item"
                          }
                        >
                          <p
                            className="page-link"
                            onClick={() => pagination(page)}
                          >
                            {page}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Reportes;
