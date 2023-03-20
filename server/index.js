import app from './app.js';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv'

dotenv.config()
const ChatPort = process.env.CHATPORT;

const server = http.createServer(app); // creating a http server
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
}); //new instance of server

let usersSocket = [];

try {
  

const addUser = (userId, socketId) => {
  !usersSocket.some((user) => user.userId === userId) && usersSocket.push({ userId, socketId });
};
const removeUser = (socketId) => {
  usersSocket = usersSocket.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return usersSocket.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  //when connect
  console.log(`User Connected: ${socket.id}`); // will console log if user is connected
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', usersSocket);
  });

  //when sendmessage
  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit('getMessage', {
      senderId,
      receiverId,
      text,
    });
  });

  //when disconnect
  socket.on('disconnect', () => {
    console.log('a user has disconnect');
    removeUser(socket.id);
    io.emit('getUsers', usersSocket);
  });
  socket.on('disconnectMe', (userId) => {
    const thisUser = usersSocket.find((user) => user.userId === userId);
    if (thisUser) {
      console.log('a user has disconnect');
      removeUser(thisUser.socketId);
      io.emit('getUsers', usersSocket);
    }
  });
});

server.listen(ChatPort, () => {
  console.log(`Chat App: ${ChatPort}`);
});
} catch (error) {
  console.log(error)
}
