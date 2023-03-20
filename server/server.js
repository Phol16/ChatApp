import app from './app.js';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import users from './routes/user.js';
import conversation from './routes/conversation.js';
import message from './routes/message.js';

dotenv.config();

const port = process.env.PORT || 3000;
const ChatPort = process.env.CHATPORT;
const mongoDB = process.env.MONGODBURI;

app.use('/users', users);
app.use('/message', message);
app.use('/conversation', conversation);

const server = http.createServer(app); // creating a http server
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
}); //new instance of server

let usersSocket = [];

const addUser = (userId, socketId) => {
  console.log(userId)
  !usersSocket.some((user) => user.usersId === userId) && usersSocket.push({ userId, socketId });
};
const removeUser = (socketId) => {
  usersSocket = usersSocket.filter((user) =>  user.socketId !== socketId);
  const userDisconnect = usersSocket.find(socket => socket.socketId === socketId)
  usersSocket = usersSocket.filter((user) =>  user.userId !== userDisconnect?.userId);
};

const getUser = ((userId)=>{
  return usersSocket.find(user=> user.userId === userId)
})

io.on('connection', (socket) => {
  //when connect
  console.log(`User Connected: ${socket.id}`); // will console log if user is connected
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', usersSocket);
  });

  //when sendmessage
  socket.on('sendMessage',({senderId, receiverId, text})=>{
    const user = getUser(receiverId);
    io.to(user.socketId).emit('getMessage',{
      senderId,
      receiverId,
      text,
    })
  })

  //when disconnect
  socket.on('disconnect', () => {
    console.log('a user has disconnect');
    removeUser(socket.id);
    io.emit('getUsers', usersSocket);
  });
});

server.listen(ChatPort, () => {
  console.log(`Chat App: ${ChatPort}`);
});

mongoose.connect(mongoDB).then(() => {
  app.listen(port, () => {
    console.log(`Server Connected  at port:${port}`);
  });
});
