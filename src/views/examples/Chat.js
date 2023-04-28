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
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8 p-4">
            <div>{isConnected ? 'CONECTADO': 'NO CONECTADO'}</div>
            <div class="mb-3 m-4">
                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="exampleFormControlInput1" 
                    placeholder="name@example.com"
                    value={nuevoMensaje}
                    onChange={e => setNuevoMensaje(e.target.value)}
                   ></input>
                <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Mensajes</label>
                <div className='bg-white' >
                    <ul>
                        {mensajes.map ((mensaje) => (
                                mensaje.usuario === 'ADMIN' ?
                                <li>{mensaje.usuario} : {mensaje.mensaje}</li>:
                                <li>TU : {mensaje.mensaje}</li>
                            ))
                        }
                    </ul>
                </div>            
                </div>
                <button className='btn bg-green'  onClick={enviarMensaje}>Enviar</button> 
            </div>
        </div>

    )

}



export default Chat;