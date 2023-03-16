import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label, 
  Col
} from "reactstrap";
// core components
//import 'bootstrap/dist/css/bootstrap.css'

import { types } from "types/types";
import { useState } from "react"; 
import _ from "lodash"; 
import { desactivarCliente } from "actions/settingUsers";
import { useDispatch,useSelector } from "react-redux";
import { activarCliente } from "actions/settingUsers";
import { useEffect } from "react";
import { fetchWithToken } from "api/fetch";
import { loading } from "notifications/notification";
import ModalUpdate from "./modalUpdate";
import { datosPorRol } from "helpers/permition";
import { ModalMap } from "./ModalMaps";
import { load } from "helpers/Estadistico";
import { Load } from "helpers/Estadistico";
import ModalRegister from "./ModalRegister";
import { warningUser } from "notifications/notification";

export const eventLoaded = ( categories ) => ({
  type: types.eventLoaded,
  payload: categories
});

const pageSize = 6;
const ListUsers = () => {
  const rol = localStorage.getItem('rol')
  const [data, setData] = useState ([]); 
  const [paginatedPost, setPagination] = useState ([]);  
  const [current, setCurrent] = useState (1);   
  const [value,setValue]=useState('');   
  const [tableFilter, setTableFilter] = useState([]);
  const [state,setState] = useState({
    color_button: '',
    name_button: ''
  })

  const [values,setValues] = useState({
    lng: 0,
    lat:0
  })

 
  

  const pageCount = data ? Math.ceil(data.length/pageSize) :0    
  let dispatch = useDispatch()
  useEffect(() => {
    async function loadedCategories(){
      const response = await fetchWithToken('users/');
      let body = await response.json(); 
      body = datosPorRol(body)
           
      
      
      const response2 = await fetchWithToken(`contratos/`);
      let body2 = await response2.json();      
      body.forEach(bodyOne => {
        body2.forEach(bodyTwo => {
          if(bodyOne.id === bodyTwo.cliente.id && bodyTwo.latitud > 0.00000000){
            bodyOne.props = [bodyTwo.latitud,bodyTwo.longitud]                        
          }
        });        
      });      

      setData(body)
      setPagination(_(body).slice(0).take(pageSize).value()) 

    }       
    loadedCategories();
    //loading()
  },[])      

  const changeData = (user) =>{    
    let newData = data.map((e) => (e.id === user.id ? e=user : e));
    setData(newData)
    setPagination(_(newData).slice(0).take(pageSize).value())  
  }

  const onHandleClick = async (user)=>{    
       
    if(user.is_active) {
         dispatch(desactivarCliente(user))
         user.is_active = false
       }else{
         dispatch(activarCliente(user)) 
         user.is_active = true
         warningUser("CLIENTE ACTIVADO CON EXITO"," ",'success');
       }     
    
    let newData = data.map((e) => (e.id === user.id ? e=user : e));
    setData(newData)
    setPagination(_(newData).slice(0).take(pageSize).value())  
  
}


  const filterData =(e) =>{
    if(e.target.value !== ""){
      setValue(e.target.value);
      const filterTable = data.filter(o=>Object.keys(o).some(k=>
          String(o[k])
                  .toLocaleLowerCase()
                  .includes(e.target.value.toLocaleLowerCase())
                  ));
          setTableFilter([...filterTable])
          
          
    }else if(e.target.value === "/"){
      setValue(e.target.value);
      const filterTable = data.filter(o=>Object.keys(o).some(k=>
          String(o[k])
                  .toLocaleLowerCase()
                  .includes(e.target.value.toLocaleLowerCase())
                  ));
          setTableFilter([...filterTable])         
    }
    else {
      setValue(e.target.value);
      setData([...data])
    }

  }
  const pages = _.range(1, pageCount+1);
  const pagination=(pageNo)=>{
    setCurrent(pageNo);
    const startIndex = (pageNo -1) * pageSize;
    const pagPost = _(data).slice(startIndex).take(pageSize).value();
    setPagination(pagPost)
  }

  
  
  
  
  function group (gp){
    
    if(gp[0] === 1){
      return "Administrador"
    }else if(gp[0] === 2){
      return "Cliente"
    }else if(gp[0] === 3){
      return "Operador"
    }else if(gp[0] === 4){
      return "Gerente"
    }  
  }
  const editUserClick =(el)=>{
    
    el.email='daniel'
    el.is_active=false

    let newData = data.map((el) => (el.id === data.id ? data.nombre : el));
    setData(newData)
    setPagination(_(newData).slice(0).take(pageSize).value())     
  }

  
  return (    

    <div className="header bg-gradient-info pb-8 pt-5 pt-md-8" >
      <Container className="mt--7" fluid>
          {/* Table */}
          
          {/* Dark table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0 row">   
                  <Col>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Buscar Usuario" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        value={value}
                        onChange={filterData}
                        />
                  </Col>

                  <Col>
                    <ModalRegister />
                  </Col>
                </CardHeader>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">rol</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Apellido</th>
                      <th scope="col">Email</th>
                      <th scope="col">Telefono</th>    
                      <th scope="col">Estado</th>                  
                      <th scope="col" >Opciones</th>
                      {
                        rol === '3' ? <th scope="col" ></th>: <></>
                      }
                    </tr>  
                  </thead>
                  <tbody  >     

                  {
                    value.length > 0 ? tableFilter.map((appo,index) => {

                      return(
                        <tr key={index}>                                  
                        <td>{appo.id}</td>   
                        <td>{group(appo.groups)}</td>                            
                        <td>{appo.first_name}</td>
                        <td>{appo.last_name}</td>  
                        <td>{appo.email}</td> 
                        <td>{appo.phone_number}</td>     
                        <td >
                           {appo.is_active ? 
                                <button className="btn btn-success btn-sm" onClick={() => onHandleClick(appo)}> Activo</button>                                             
                                : <button className="btn btn-danger btn-sm" onClick={() => onHandleClick(appo)}> Inactivo</button> 
                            }
                              
                        </td>
                        <td >{<ModalUpdate props={appo} changeData={changeData}/>}
                        </td>
                        {                             
                          rol === '3' ?  <td><ModalMap props={appo.props} id={appo.id}/></td>: <></>                              
                        }

                                                   
                     </tr>
                     
                      )
                        })
                        : paginatedPost.map((appo,index) => {
                          
                          return(
                            <tr key={index}>                                  
                            <td>{appo.id}</td>   
                            <td>{group(appo.groups)}</td>                            
                            <td>{appo.first_name}</td>
                            <td>{appo.last_name}</td>  
                            <td>{appo.email}</td> 
                            <td>{appo.phone_number}</td>     
                            <td >
                               {appo.is_active ? 
                                    <button className="btn btn-success btn-sm" onClick={() => onHandleClick(appo)}> Activo</button>                                             
                                    : <button className="btn btn-danger btn-sm" onClick={() => onHandleClick(appo)}> Inactivo</button> 
                                }
                                  
                            </td>
                            <td >{<ModalUpdate props={appo} changeData={changeData}/>}
                            </td>
                            {                             
                              rol === '3' ?  <td><ModalMap props={appo.props} id={appo.id}/></td>: <></>                              
                            }

                                                       
                         </tr>
                         
                          )
                        } )
                  }
                  </tbody>                 
  
                </Table>
                <CardFooter className="py-4 bg-default shadow">
                <nav className='d-felx justify-content-center'>
                  <ul className='pagination'>
                     {
                        pages.map((page)=>(
                           <li className={
                              page === current ? "page-item active" : "page-item"
                           }>
                              <p className='page-link'
                                 onClick={()=>pagination(page)}>
                                    {page}
                              </p>
                           </li>
                        ))
                          }
                  </ul>
               </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
     
    </div>
    

    
  );
};

export default ListUsers;
