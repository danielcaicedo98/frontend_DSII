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
    Card,
    CardHeader,
    CardFooter,
    Table,
    Container,
    Row
  } from "reactstrap";
  // core components
 
  import { types } from "types/types";
  import { useState } from "react"; 
  import _ from "lodash"; 
  import { desactivarCliente } from "actions/settingUsers";
  import { useDispatch,useSelector } from "react-redux";
  import { activarCliente } from "actions/settingUsers";
  import { useEffect } from "react";
  import { fetchWithToken } from "api/fetch";
  import { loading } from "notifications/notification";



  const pageSize = 5;
  
  export const eventLoaded = ( categories ) => ({
    type: types.eventLoaded,
    payload: categories
  });
  
  const Tables = ( ) => {
    //const[values] = useState(useSelector(state => state.users ).rows)


    //const [data, setData] = useState ( values ); 
    //const [paginatedPost, setPagination] = useState (_(values).slice(0).take(pageSize).value());  
    const [data, setData] = useState ([]); 
    const [paginatedPost, setPagination] = useState ([]);  
    const [current, setCurrent] = useState (1);   
    const [value,setValue]=useState('');   
    const [tableFilter, setTableFilter] = useState([]);
    const pageCount = data ? Math.ceil(data.length/pageSize) :0    
    let dispatch = useDispatch()

    useEffect(() => {
      async function loadedCategories(){
        const response = await fetchWithToken('users/');
        const body = await response.json(); 
        setData(body)
        setPagination(_(body).slice(0).take(pageSize).value()) 
      }       
      loadedCategories();
    },[])     



   const onHandleClick = async (e) =>{    
      console.log(e.id)
      e.is_active ? 
        dispatch(desactivarCliente(e)):
        dispatch(activarCliente(e))

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
  

  
    return (
      <>
        
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
  
          {/* Dark table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                <h3 className="mb-0">Listado de Usuarios</h3>
                            
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Buscar Usuario" 
                                aria-label="Username" 
                                aria-describedby="basic-addon1"
                                value={value}
                                onChange={filterData}
                                />
                </CardHeader>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                    <th scope="col">ID</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Apellido</th>
                      <th scope="col">Email</th>
                      <th scope="col">Telefono</th>                    
                      <th scope="col" >Opciones</th>
                    </tr>  
                  </thead>
                  <tbody>
                   
                    

                  {
                    value.length > 0 ? tableFilter.map((appo,index) => {
                        return (
                        <tr key={index}>      
                          <td>{appo.id}</td>                               
                          <td>{appo.first_name}</td>
                          <td>{appo.last_name}</td>  
                          <td>{appo.email}</td> 
                          <td>{appo.phone_number}</td> 
                          <button className="bg-red">{
                            appo.is_active ? "Activo": "Desactivado"
                          }</button>
                        </tr>
                        )
                        })
                        : paginatedPost.map((appo,index) => {
                          return(
                            <tr key={index}>                                  
                            <td>{appo.id}</td>                               
                            <td>{appo.first_name}</td>
                            <td>{appo.last_name}</td>  
                            <td>{appo.email}</td> 
                            <td>{appo.phone_number}</td>     
                            <td>
                               {
                                    appo.is_active ? 
                                    <button className="bg-green" onClick={() => onHandleClick(appo)}> Activo</button>                                             
                                    : <button className="bg-red" onClick={() => onHandleClick(appo)}> Inactivo</button> 
                                }
                            </td>

                                                       
                         </tr>
                          )
                        })
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
      </>
    );
  };
  
  export default Tables;
  