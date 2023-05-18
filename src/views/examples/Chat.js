import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');
const Chat = () => {

    const [isConnected, setIsconnected] = useState();
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const [mensajes, setMensajes] = useState([]);

    useEffect(() => {

        if (socket.on().connected)
            setIsconnected(true)
        socket.on('chat_message', (data) => {
            setMensajes(mensajes => [...mensajes, data]);
            console.log(data)
        });

        return () => {
            socket.off('connect');
            socket.off('chat_message');
        }

    }, []);

    const enviarMensaje = () => {

        socket.emit('chat_message', {
            usuario: socket.id,
            mensaje: nuevoMensaje
        });
        setNuevoMensaje('');
    }
    return (
        <div className="header bg-gradient-info rounded">
            <div className="text-center">
                <h1>Bienvenido a NRG-X</h1>
            </div>

            {/* <div>{isConnected ? 'CONECTADO': 'NO CONECTADO'}</div> */}
            <div className="mb-3 mx-4 p-3 bg-light border rounded mt-3">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">
                        Mensajes
                    </label>
                    <div className="bg-white p-2 border rounded" style={{ height: '300px', width: '400px' }}>
                        <ul style={{ maxHeight: '100%', overflowY: 'scroll' }}>
                            {mensajes.map((mensaje) => (
                                <li>
                                    {mensaje.usuario === 'ADMIN' ? (
                                        <>
                                            {mensaje.usuario}: {mensaje.mensaje}
                                        </>
                                    ) : (
                                        <>TU: {mensaje.mensaje}</>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <input
                        type="text"
                        className="form-control mt-3"
                        id="Escribe tu mensaje"
                        placeholder="Escribe tu mensaje"
                        value={nuevoMensaje}
                        onChange={(e) => setNuevoMensaje(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={enviarMensaje}>
                    Enviar
                </button>
            </div>
        </div>


    )

}



export default Chat;