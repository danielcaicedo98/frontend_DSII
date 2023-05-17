const io = require('socket.io-client');
const server = require('./index');

describe('socket.io server', () => {
  let socket;

  beforeAll((done) => {
    socket = io.connect('http://localhost:3000', {
      reconnectionDelay: 0,
      forceNew: true,
      transports: ['websocket']
    });
    socket.on('connect', () => {
      done();
    });
  });

  afterAll((done) => {
    if (socket.connected) {
      socket.disconnect();
    }
    done();
  });

  test('Establecer conexión con el servidor', (done) => {
    expect(socket.connected).toBe(true);
    done();
  });
});



describe('socket.io server', () => {
  let clientSocket;
  let adminSocket;

  beforeAll((done) => {
    const options = {
      reconnectionDelay: 0,
      forceNew: true,
      transports: ['websocket']
    };
    clientSocket = io.connect('http://localhost:3000', options);
    adminSocket = io.connect('http://localhost:3000', options);
    clientSocket.on('connect', () => {
      done();
    });
    adminSocket.on('connect', () => {
      adminSocket.emit('join', 'admin');
    });
  });

  afterAll((done) => {
    if (clientSocket.connected) {
      clientSocket.disconnect();
    }
    if (adminSocket.connected) {
      adminSocket.disconnect();
    }
    done();
  });

  test('Recepción correcta de mensajes desde el cliente', (done) => {
    const message = {
      usuario: 'test',
      mensaje: 'Hola mundo!'
    };
    adminSocket.on('chat_message', (msg) => {
      expect(msg).toEqual(message);
      done();
    });
    clientSocket.emit('chat_message', message);
  });
});
