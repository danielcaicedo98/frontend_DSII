import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');
const usuario = 'admin'
const ChatAdmin = () => {

    const [isConnected, setIsconnected] = useState();
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const [mensajes, setMensajes] = useState([]);

    useEffect(() => {
        if (socket.on().connected)
            setIsconnected(true)

        socket.on('chat_message', (data) => {
            if (data.usuario === 'admin') {
                data.usuario = 'ADMIN';
            }
            setMensajes(mensajes => [...mensajes, data]);
            console.log(data)
        });

        return () => {
            socket.off('connect');
            socket.off('chat_message');
        }

    }, []);

    const enviarMensaje = () => {
        let usuario = socket.id;
        if (usuario === 'admin') {
            usuario = 'ADMIN';
        }
        socket.emit('chat_message', {
            usuario: 'ADMIN',
            mensaje: nuevoMensaje,
            id: 'ADMIN'
        });
        setNuevoMensaje('');
    }

    return (
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8 p-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* <div>{isConnected ? 'CONECTADO': 'NO CONECTADO'}</div> */}
            <div class="mb-3 m-4 p-7" style={{width: "80%"}}>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1 p-7" class="form-label" style={{ color: 'white', fontSize: '24px', textAlign: 'center' }}>Mensajes</label>
                    <div className="chat-container bg-white p-2 border rounded" style={{ height: '300px', overflow: 'auto' }}>
                        <ul>
                            {mensajes.map((mensaje) => (
                                mensaje.usuario === 'ADMIN' ?
                                    <li>{mensaje.usuario}: {mensaje.mensaje}</li> :
                                    <li>Cliente: {mensaje.mensaje}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div class="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="Escribe tu mensaje"
                        placeholder="Escribe tu mensaje"
                        value={nuevoMensaje}
                        onChange={e => setNuevoMensaje(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                <button className="btn bg-green" onClick={enviarMensaje} style={{ fontSize: '16px', padding: '10px 30px' }}>Enviar</button>
                </div>
            </div>
        </div>



    )

}



export default ChatAdmin;