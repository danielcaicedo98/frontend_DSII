
import { editUser } from 'actions/settingUsers';
import React,{  useState  } from 'react'
import { 
  
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
  Label 
} from "reactstrap";



const ModalUpdate = ( {props, changeData}) => {
  const [stateModal,setStateModal] = useState({
    abierto: false,
  })

  const abrirModal =(e) =>{
    setStateModal({
      abierto: e
    })
  } 
  
  const [values,setValues] = useState(props)
  
  

  const handleInputChange = (e) =>{
       
    setValues({...values, [e.target.name] : e.target.type === 'number' ? parseInt(e.target.value) : e.target.value      
    })
    console.log(values)
    
  }

  const onFormSubmit = async (e) =>{      
    console.log('values')      
    e.preventDefault()
    editUser(values)
    abrirModal(false)
    changeData(values)     
  }

  const returnValues = () => {
    changeData(values) 
  }  
  
   
  return (
    <div>
      <button className="btn btn-primary btn-sm" onClick={() => abrirModal(true)} >
          Editar
      </button>
      <Modal isOpen={stateModal.abierto} className='modal-dialog modal-lg '>
        <ModalHeader className='bg-primary'>
          {`Editar usuario con ID: ${props.id}`} 
        </ModalHeader>
        <ModalBody className='' >
          <Form role='form' className='row g-3' onSubmit={(e) => onFormSubmit(e)}>
            <div className='col-md-6 '>
              <Label for='Usuario'>Nombre</Label>
              <Input 
                type="text" 
                name = "first_name" 
                className="form-control input-sm"     
                value={ values.first_name }    
                //value = { values.first_name }               
                onChange={ (e) => handleInputChange(e)  } 
                ></Input>
            </div>
            <div className='col-md-6'>
              <Label for='Usuario'>Apellido</Label>
              <Input 
                type="text" 
                name = "last_name" 
                className="form-control input-sm"  
                value = { values.last_name }      
                onChange={ (e) => handleInputChange(e)  } 
                ></Input>
            </div>    
            <div className='col-md-6'>
              <Label for='Usuario'>Correo Electronico</Label>
              <Input 
                type="email" 
                name = "email" 
                className="form-control input-sm"   
                value = { values.email }                                  
                onChange={ (e) => handleInputChange(e)  } 
                ></Input>
            </div>
            <div className='col-md-6'>
              <Label for='Usuario'>Telefono</Label>
              <Input 
                type="number" 
                name = "phone_number" 
                className="form-control input-sm"   
                value = { values.phone_number }  
                //placeholder={ props.phone_number }                   
                onChange={(e) => handleInputChange(e) } 
                ></Input>
            </div>
          </Form>          
        </ModalBody>
        <ModalFooter className='border'>
          <Button type='submit' className="btn-success" onClick={(e) => onFormSubmit(e)}>Enviar</Button>
          <Button className=" btn btn-danger" onClick={() => abrirModal(false)}>Cerrar</Button>
                    
        </ModalFooter>
      </Modal>

    </div>

  )
  

}

export default ModalUpdate;