import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');
const Chat = () => {

    const[isConnected, setIsconnected] = useState();
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const [mensajes, setMensajes] = useState([]);
 
    useEffect(() => {
        
        if(socket.on().connected)
            setIsconnected(true)
        socket.on('chat_message', (data) => {
            setMensajes(mensajes => [...mensajes, data]);
            console.log(data)
        });
        
        return () => {
            socket.off('connect');
            socket.off('chat_message');
        }
        
    },[]);

    const enviarMensaje = () => {

        socket.emit('chat_message', {
          usuario: socket.id,
          mensaje: nuevoMensaje
        });
        setNuevoMensaje('');
      }
    return(
        <div className="header bg-gradient-info  ">
            {/* <div>{isConnected ? 'CONECTADO': 'NO CONECTADO'}</div> */}
            <div class="mb-3 m-4 p-3 bg-light ">                
                <div class="mb-3">
                <label for="exampleFormControlTextarea1 p-7" class="form-label">Mensajes</label>
                <div className='bg-white p-2 border rounded' >
                    <ul>
                        {mensajes.map ((mensaje) => (
                                mensaje.usuario === 'ADMIN' ?
                                <li>{mensaje.usuario} : {mensaje.mensaje}</li>:
                                <li>TU: {mensaje.mensaje}</li>
                                
                            ))
                        }
                    </ul>
                </div>
                <input 
                    type="text" 
                    className="form-control " 
                    id="Escribe tu mensajes" 
                    placeholder="Escribe tu mensaje"
                    value={nuevoMensaje}
                    onChange={e => setNuevoMensaje(e.target.value)}
                   ></input>            
                </div>
                <button className='btn bg-green'  onClick={enviarMensaje}>Enviar</button> 
            </div>            
        </div>


    )

}



export default Chat;