
const http = require('http');

const server = http.createServer();

const io = require('socket.io')(server, {
    cors: { origin: '*' }
});

io.on('connection', (socket) => {
    console.log('Se ha conectado un cliente');
  
    if(socket.id === 'admin') {
      socket.emit('chat_message', {
        usuario: 'INFO',
        mensaje: 'Bienvenido al chat de administrador'
      });
    }

  
    socket.join('admin');
  
    socket.on('chat_message', (data) => {
      io.to('admin').emit('chat_message', data);
      console.log(data)
    });

  });
  
server.listen(3000);  